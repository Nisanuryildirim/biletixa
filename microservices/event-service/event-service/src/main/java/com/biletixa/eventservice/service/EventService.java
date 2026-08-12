package com.biletixa.eventservice.service;

import com.biletixa.eventservice.model.Event;
import com.biletixa.eventservice.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(
            EventRepository eventRepository
    ) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(
            String id
    ) {
        return eventRepository.findById(id);
    }

    public List<Event> getEvents(
            String city,
            String category
    ) {
        if (
                city != null &&
                !city.isBlank() &&
                category != null &&
                !category.isBlank()
        ) {
            return eventRepository.findByCityAndCategory(
                    city,
                    category
            );
        }

        if (
                city != null &&
                !city.isBlank()
        ) {
            return eventRepository.findByCity(city);
        }

        if (
                category != null &&
                !category.isBlank()
        ) {
            return eventRepository.findByCategory(
                    category
            );
        }

        return eventRepository.findAll();
    }

    public Event createEvent(
            Event event
    ) {
        return eventRepository.save(event);
    }

    public void deleteEvent(
            String id
    ) {
        eventRepository.deleteById(id);
    }
}