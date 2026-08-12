package com.biletixa.favoriteservice.controller;

import com.biletixa.favoriteservice.model.Favorite;
import com.biletixa.favoriteservice.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(
            FavoriteService favoriteService
    ) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public List<Favorite> getFavorites(
            @RequestParam String userId
    ) {
        return favoriteService
                .getFavoritesByUserId(userId);
    }

    @GetMapping("/check")
    public ResponseEntity<Favorite> checkFavorite(
            @RequestParam String userId,
            @RequestParam String eventId
    ) {
        return favoriteService
                .getFavorite(userId, eventId)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }

    @PostMapping
    public Favorite addFavorite(
            @RequestBody Favorite favorite
    ) {
        return favoriteService
                .addFavorite(favorite);
    }

    @DeleteMapping
    public ResponseEntity<Void> removeFavorite(
            @RequestParam String userId,
            @RequestParam String eventId
    ) {
        favoriteService.removeFavorite(
                userId,
                eventId
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}