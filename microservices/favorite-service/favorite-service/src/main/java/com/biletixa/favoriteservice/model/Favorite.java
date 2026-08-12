package com.biletixa.favoriteservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favorites")
public class Favorite {

    @Id
    private String id;

    private String userId;
    private String eventId;
    private String eventTitle;
    private String eventImage;
    private String eventDate;
    private String venue;

    public Favorite() {
    }

    public Favorite(
            String userId,
            String eventId,
            String eventTitle,
            String eventImage,
            String eventDate,
            String venue
    ) {
        this.userId = userId;
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.eventImage = eventImage;
        this.eventDate = eventDate;
        this.venue = venue;
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

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventImage() {
        return eventImage;
    }

    public void setEventImage(String eventImage) {
        this.eventImage = eventImage;
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
}