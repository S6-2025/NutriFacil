package com.nutrifacil.app.Repositories;

import com.nutrifacil.app.Models.MealEntry;
import com.nutrifacil.app.Models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MealEntryRepository extends JpaRepository<MealEntry, UUID> {
    @Query("SELECT me from MealEntry me JOIN FETCH me.food WHERE me.userProfile = :profile AND me.consumedAt BETWEEN :start AND :end")
    Optional<List<MealEntry>> findAllWithFoodByUserProfileAndDateRange(
            @Param("profile") Profile userProfile,
            @Param("start") LocalDateTime startOfDay,
            @Param("end") LocalDateTime endOfDay);
}
