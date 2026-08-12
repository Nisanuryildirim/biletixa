package com.biletixa.ticketservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tickets")
public class Ticket {

    @Id
    private String id;

    private String eventId;
    private String userId;

    private String eventTitle;
    private String eventDate;
    private String venue;

    private String seatNumber;
    private String ticketType;

    private double price;

    private String status;

    public Ticket() {
    }

    public Ticket(
            String id,
            String eventId,
            String userId,
            String eventTitle,
            String eventDate,
            String venue,
            String seatNumber,
            String ticketType,
            double price,
            String status
    ) {
        this.id = id;
        this.eventId = eventId;
        this.userId = userId;
        this.eventTitle = eventTitle;
        this.eventDate = eventDate;
        this.venue = venue;
        this.seatNumber = seatNumber;
        this.ticketType = ticketType;
        this.price = price;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}