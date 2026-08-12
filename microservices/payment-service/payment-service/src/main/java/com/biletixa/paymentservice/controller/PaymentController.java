package com.biletixa.paymentservice.controller;

import com.biletixa.paymentservice.model.Payment;
import com.biletixa.paymentservice.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(
            PaymentService paymentService
    ) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> getPayments(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String eventId,
            @RequestParam(required = false) String status
    ) {
        if (userId != null && !userId.isBlank()) {
            return paymentService.getPaymentsByUserId(userId);
        }

        if (eventId != null && !eventId.isBlank()) {
            return paymentService.getPaymentsByEventId(eventId);
        }

        if (status != null && !status.isBlank()) {
            return paymentService.getPaymentsByStatus(status);
        }

        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(
            @PathVariable String id
    ) {
        return paymentService
                .getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }

    @PostMapping
    public Payment createPayment(
            @RequestBody Payment payment
    ) {
        return paymentService.createPayment(payment);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Payment> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body
    ) {
        String status = body.get("status");

        if (status == null || status.isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }

        return paymentService
                .updateStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable String id
    ) {
        paymentService.deletePayment(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}