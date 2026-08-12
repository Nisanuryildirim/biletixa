package com.biletixa.paymentservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "payments")
public class Payment {

    @Id
    private String id;

    private String userId;
    private String eventId;

    private List<String> ticketIds;

    private double amount;

    private String cardHolder;
    private String maskedCardNumber;

    private String status;

    private String createdAt;

    public Payment() {
    }

    public Payment(
            String id,
            String userId,
            String eventId,
            List<String> ticketIds,
            double amount,
            String cardHolder,
            String maskedCardNumber,
            String status,
            String createdAt
    ) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.ticketIds = ticketIds;
        this.amount = amount;
        this.cardHolder = cardHolder;
        this.maskedCardNumber = maskedCardNumber;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public List<String> getTicketIds() {
        return ticketIds;
    }

    public void setTicketIds(List<String> ticketIds) {
        this.ticketIds = ticketIds;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }

    public String getMaskedCardNumber() {
        return maskedCardNumber;
    }

    public void setMaskedCardNumber(String maskedCardNumber) {
        this.maskedCardNumber = maskedCardNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}