package com.biletixa.paymentservice.repository;

import com.biletixa.paymentservice.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentRepository
        extends MongoRepository<Payment, String> {

    List<Payment> findByUserId(String userId);

    List<Payment> findByEventId(String eventId);

    List<Payment> findByStatus(String status);
}