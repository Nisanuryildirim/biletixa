package com.biletixa.eventservice.repository;

import com.biletixa.eventservice.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository
        extends MongoRepository<Event, String> {

    List<Event> findByCity(String city);

    List<Event> findByCategory(String category);

    List<Event> findByCityAndCategory(
            String city,
            String category
    );
}