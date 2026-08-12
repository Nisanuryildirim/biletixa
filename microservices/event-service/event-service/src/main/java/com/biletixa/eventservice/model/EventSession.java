package com.biletixa.eventservice.model;

public class EventSession {

    private String date;
    private String time;
    private String venue;

    private double price;
    private String priceText;

    private String ticketType;

    public EventSession() {
    }

    public EventSession(
            String date,
            String time,
            String venue,
            double price,
            String priceText,
            String ticketType
    ) {
        this.date = date;
        this.time = time;
        this.venue = venue;
        this.price = price;
        this.priceText = priceText;
        this.ticketType = ticketType;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPriceText() {
        return priceText;
    }

    public void setPriceText(String priceText) {
        this.priceText = priceText;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }
}