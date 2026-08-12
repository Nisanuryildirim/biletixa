package com.biletixa.user_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;
    private String email;
    private String password;

    private boolean emailVerified;
    private String verificationCode;

    public User() {
    }

    public User(
            String fullName,
            String email,
            String password
    ) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.emailVerified = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(
            String fullName
    ) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password
    ) {
        this.password = password;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(
            boolean emailVerified
    ) {
        this.emailVerified =
                emailVerified;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(
            String verificationCode
    ) {
        this.verificationCode =
                verificationCode;
    }
}