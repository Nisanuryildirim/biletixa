package com.biletixa.eventservice.controller;

import com.biletixa.eventservice.model.Event;
import com.biletixa.eventservice.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(
            EventService eventService
    ) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getEvents(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String category
    ) {
        return eventService.getEvents(
                city,
                category
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(
            @PathVariable String id
    ) {
        return eventService
                .getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }

    @PostMapping
    public Event createEvent(
            @RequestBody Event event
    ) {
        return eventService.createEvent(event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable String id
    ) {
        eventService.deleteEvent(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}