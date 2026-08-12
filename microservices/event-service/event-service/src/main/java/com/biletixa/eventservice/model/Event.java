package com.biletixa.eventservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private int rank;

    private String title;
    private String city;
    private String district;
    private String category;
    private String image;

    private String date;
    private String venue;

    private double price;
    private String priceText;

    private double rating;
    private int reviewCount;

    private String artist;
    private String organizer;

    private Boolean featured;
    private Boolean campaign;
    private Boolean soon;

    private String description;

    private List<String> tags;

    private List<EventSession> sessions;

    private List<String> rules;

    public Event() {
    }

    public Event(
            String id,
            int rank,
            String title,
            String city,
            String district,
            String category,
            String image,
            String date,
            String venue,
            double price,
            String priceText,
            double rating,
            int reviewCount,
            String artist,
            String organizer,
            Boolean featured,
            Boolean campaign,
            Boolean soon,
            String description,
            List<String> tags,
            List<EventSession> sessions,
            List<String> rules
    ) {
        this.id = id;
        this.rank = rank;
        this.title = title;
        this.city = city;
        this.district = district;
        this.category = category;
        this.image = image;
        this.date = date;
        this.venue = venue;
        this.price = price;
        this.priceText = priceText;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.artist = artist;
        this.organizer = organizer;
        this.featured = featured;
        this.campaign = campaign;
        this.soon = soon;
        this.description = description;
        this.tags = tags;
        this.sessions = sessions;
        this.rules = rules;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public Boolean getCampaign() {
        return campaign;
    }

    public void setCampaign(Boolean campaign) {
        this.campaign = campaign;
    }

    public Boolean getSoon() {
        return soon;
    }

    public void setSoon(Boolean soon) {
        this.soon = soon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<EventSession> getSessions() {
        return sessions;
    }

    public void setSessions(List<EventSession> sessions) {
        this.sessions = sessions;
    }

    public List<String> getRules() {
        return rules;
    }

    public void setRules(List<String> rules) {
        this.rules = rules;
    }
}