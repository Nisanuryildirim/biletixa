package com.biletixa.ticketservice.repository;

import com.biletixa.ticketservice.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TicketRepository
        extends MongoRepository<Ticket, String> {

    List<Ticket> findByEventId(String eventId);

    List<Ticket> findByUserId(String userId);

    List<Ticket> findByStatus(String status);

    List<Ticket> findByEventIdAndStatus(
            String eventId,
            String status
    );
}