package com.biletixa.eventservice.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedEvents() {
        return args -> {
            System.out.println(
                    "DataSeeder pasif. Etkinlik verileri API üzerinden yönetiliyor."
            );
        };
    }
}