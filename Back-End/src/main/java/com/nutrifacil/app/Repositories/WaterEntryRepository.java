package com.nutrifacil.app.Repositories;

import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Models.WaterEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WaterEntryRepository extends JpaRepository<WaterEntry, UUID> {
    @Query("SELECT wt from WaterEntry wt WHERE wt.userProfile = :profile AND wt.consumedAt BETWEEN :start AND :end")
    Optional<List<WaterEntry>> findAllByUserProfileAndDateRange(
            @Param("profile") Profile profile,
            @Param("start") LocalDateTime startOfDay,
            @Param("end") LocalDateTime endOfDay);
}
