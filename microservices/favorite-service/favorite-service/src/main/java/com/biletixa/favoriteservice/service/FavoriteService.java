package com.biletixa.favoriteservice.service;

import com.biletixa.favoriteservice.model.Favorite;
import com.biletixa.favoriteservice.repository.FavoriteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public FavoriteService(
            FavoriteRepository favoriteRepository
    ) {
        this.favoriteRepository = favoriteRepository;
    }

    public List<Favorite> getFavoritesByUserId(
            String userId
    ) {
        return favoriteRepository.findByUserId(
                userId
        );
    }

    public Optional<Favorite> getFavorite(
            String userId,
            String eventId
    ) {
        return favoriteRepository
                .findByUserIdAndEventId(
                        userId,
                        eventId
                );
    }

    public Favorite addFavorite(
            Favorite favorite
    ) {
        Optional<Favorite> existingFavorite =
                favoriteRepository
                        .findByUserIdAndEventId(
                                favorite.getUserId(),
                                favorite.getEventId()
                        );

        if (existingFavorite.isPresent()) {
            return existingFavorite.get();
        }

        return favoriteRepository.save(
                favorite
        );
    }

    public void removeFavorite(
            String userId,
            String eventId
    ) {
        favoriteRepository
                .deleteByUserIdAndEventId(
                        userId,
                        eventId
                );
    }
}