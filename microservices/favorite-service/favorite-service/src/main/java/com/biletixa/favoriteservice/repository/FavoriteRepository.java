package com.biletixa.favoriteservice.repository;

import com.biletixa.favoriteservice.model.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository
        extends MongoRepository<Favorite, String> {

    List<Favorite> findByUserId(
            String userId
    );

    Optional<Favorite> findByUserIdAndEventId(
            String userId,
            String eventId
    );

    boolean existsByUserIdAndEventId(
            String userId,
            String eventId
    );

    void deleteByUserIdAndEventId(
            String userId,
            String eventId
    );
}