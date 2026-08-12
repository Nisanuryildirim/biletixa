package com.biletixa.user_service.controller;

import com.biletixa.user_service.model.User;
import com.biletixa.user_service.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService =
                userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user
    ) {

        try {

            User created =
                    userService.register(user);

            return ResponseEntity.ok(
                    Map.of(
                            "id",
                            created.getId(),

                            "fullName",
                            created.getFullName(),

                            "email",
                            created.getEmail(),

                            "message",
                            "Doğrulama kodu e-posta adresine gönderildi."
                    )
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(
            @RequestBody Map<String, String> body
    ) {

        String email =
                body.get("email");

        String code =
                body.get("code");

        boolean verified =
                userService.verifyEmail(
                        email,
                        code
                );

        if (!verified) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Doğrulama kodu hatalı."
                            )
                    );
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "E-posta başarıyla doğrulandı."
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> body
    ) {

        String email =
                body.get("email");

        String password =
                body.get("password");

        return userService
                .login(
                        email,
                        password
                )
                .<ResponseEntity<?>>map(
                        user ->
                                ResponseEntity.ok(
                                        Map.of(
                                                "id",
                                                user.getId(),

                                                "fullName",
                                                user.getFullName(),

                                                "email",
                                                user.getEmail()
                                        )
                                )
                )
                .orElseGet(
                        () ->
                                ResponseEntity
                                        .status(401)
                                        .body(
                                                Map.of(
                                                        "message",
                                                        "E-posta doğrulanmamış veya giriş bilgileri hatalı."
                                                )
                                        )
                );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(
            @PathVariable String id
    ) {

        return userService
                .getUserById(id)
                .<ResponseEntity<?>>map(
                        user ->
                                ResponseEntity.ok(
                                        Map.of(
                                                "id",
                                                user.getId(),

                                                "fullName",
                                                user.getFullName(),

                                                "email",
                                                user.getEmail()
                                        )
                                )
                )
                .orElseGet(
                        () ->
                                ResponseEntity
                                        .notFound()
                                        .build()
                );
    }
}