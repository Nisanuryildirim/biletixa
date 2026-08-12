package com.biletixa.ticketservice.service;

import com.biletixa.ticketservice.model.Ticket;
import com.biletixa.ticketservice.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(
            TicketRepository ticketRepository
    ) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> getTicketById(
            String id
    ) {
        return ticketRepository.findById(id);
    }

    public List<Ticket> getTicketsByEventId(
            String eventId
    ) {
        return ticketRepository.findByEventId(
                eventId
        );
    }

    public List<Ticket> getTicketsByUserId(
            String userId
    ) {
        return ticketRepository.findByUserId(
                userId
        );
    }

    public List<Ticket> getTicketsByStatus(
            String status
    ) {
        return ticketRepository.findByStatus(
                status
        );
    }

    public Ticket createTicket(
            Ticket ticket
    ) {
        if (
                ticket.getStatus() == null ||
                ticket.getStatus().isBlank()
        ) {
            ticket.setStatus("RESERVED");
        }

        return ticketRepository.save(
                ticket
        );
    }

    public Optional<Ticket> updateStatus(
            String id,
            String status
    ) {
        return ticketRepository
                .findById(id)
                .map(ticket -> {
                    ticket.setStatus(
                            status
                    );

                    return ticketRepository.save(
                            ticket
                    );
                });
    }

    public void deleteTicket(
            String id
    ) {
        ticketRepository.deleteById(
                id
        );
    }
}