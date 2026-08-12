package com.biletixa.user_service.service;

import com.biletixa.user_service.model.User;
import com.biletixa.user_service.repository.UserRepository;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    private final SecureRandom secureRandom =
            new SecureRandom();

    public UserService(
            UserRepository userRepository,
            JavaMailSender mailSender
    ) {
        this.userRepository =
                userRepository;

        this.mailSender =
                mailSender;

        this.passwordEncoder =
                new BCryptPasswordEncoder();
    }

    public User register(User user) {

        if (userRepository.existsByEmail(
                user.getEmail()
        )) {
            throw new IllegalArgumentException(
                    "Bu e-posta zaten kayıtlı."
            );
        }

        String hashedPassword =
                passwordEncoder.encode(
                        user.getPassword()
                );

        user.setPassword(
                hashedPassword
        );

        String verificationCode =
                String.format(
                        "%06d",
                        secureRandom.nextInt(
                                1_000_000
                        )
                );

        user.setVerificationCode(
                verificationCode
        );

        user.setEmailVerified(false);

        User savedUser =
                userRepository.save(user);

        sendVerificationEmail(
                savedUser.getEmail(),
                verificationCode
        );

        return savedUser;
    }

    private void sendVerificationEmail(
            String email,
            String code
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Biletixa E-posta Doğrulama"
        );

        message.setText(
                "Biletixa hesabını doğrulamak için kodun: "
                        + code
        );

        mailSender.send(message);
    }

    public boolean verifyEmail(
            String email,
            String code
    ) {

        Optional<User> userOptional =
                userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return false;
        }

        User user =
                userOptional.get();

        if (user.isEmailVerified()) {
            return true;
        }

        if (
                user.getVerificationCode() == null
                        ||
                !user.getVerificationCode()
                        .equals(code)
        ) {
            return false;
        }

        user.setEmailVerified(true);
        user.setVerificationCode(null);

        userRepository.save(user);

        return true;
    }

    public Optional<User> login(
            String email,
            String password
    ) {

        return userRepository
                .findByEmail(email)
                .filter(User::isEmailVerified)
                .filter(user ->
                        passwordEncoder.matches(
                                password,
                                user.getPassword()
                        )
                );
    }

    public Optional<User> getUserById(
            String id
    ) {
        return userRepository.findById(id);
    }
}