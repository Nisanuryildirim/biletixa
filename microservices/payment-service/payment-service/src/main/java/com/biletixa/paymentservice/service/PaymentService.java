package com.biletixa.paymentservice.service;

import com.biletixa.paymentservice.model.Payment;
import com.biletixa.paymentservice.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(
            PaymentRepository paymentRepository
    ) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(
            String id
    ) {
        return paymentRepository.findById(id);
    }

    public List<Payment> getPaymentsByUserId(
            String userId
    ) {
        return paymentRepository.findByUserId(
                userId
        );
    }

    public List<Payment> getPaymentsByEventId(
            String eventId
    ) {
        return paymentRepository.findByEventId(
                eventId
        );
    }

    public List<Payment> getPaymentsByStatus(
            String status
    ) {
        return paymentRepository.findByStatus(
                status
        );
    }

    public Payment createPayment(
            Payment payment
    ) {
        if (
                payment.getStatus() == null ||
                payment.getStatus().isBlank()
        ) {
            payment.setStatus("SUCCESS");
        }

        payment.setCreatedAt(
                LocalDateTime.now().toString()
        );

        return paymentRepository.save(
                payment
        );
    }

    public Optional<Payment> updateStatus(
            String id,
            String status
    ) {
        return paymentRepository
                .findById(id)
                .map(payment -> {

                    payment.setStatus(
                            status
                    );

                    return paymentRepository.save(
                            payment
                    );
                });
    }

    public void deletePayment(
            String id
    ) {
        paymentRepository.deleteById(
                id
        );
    }
}