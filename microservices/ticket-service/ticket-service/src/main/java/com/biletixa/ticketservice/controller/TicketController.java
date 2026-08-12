package com.biletixa.ticketservice.controller;

import com.biletixa.ticketservice.model.Ticket;
import com.biletixa.ticketservice.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(
            TicketService ticketService
    ) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> getTickets(
            @RequestParam(required = false) String eventId,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String status
    ) {
        if (
                eventId != null &&
                !eventId.isBlank()
        ) {
            return ticketService
                    .getTicketsByEventId(eventId);
        }

        if (
                userId != null &&
                !userId.isBlank()
        ) {
            return ticketService
                    .getTicketsByUserId(userId);
        }

        if (
                status != null &&
                !status.isBlank()
        ) {
            return ticketService
                    .getTicketsByStatus(status);
        }

        return ticketService
                .getAllTickets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable String id
    ) {
        return ticketService
                .getTicketById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }

    @PostMapping
    public Ticket createTicket(
            @RequestBody Ticket ticket
    ) {
        return ticketService
                .createTicket(ticket);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Ticket> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body
    ) {
        String status =
                body.get("status");

        if (
                status == null ||
                status.isBlank()
        ) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }

        return ticketService
                .updateStatus(
                        id,
                        status
                )
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(
            @PathVariable String id
    ) {
        ticketService
                .deleteTicket(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}