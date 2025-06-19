package com.nutrifacil.app.DTO;

import java.time.LocalDate;
import java.util.List;

public record DailyMealTrackerResponseDTO(
        LocalDate date,
        Double caloriesGoal,
        Double caloriesConsumed,
        Double caloriesRemaining,
        List<MealEntryDTO> entries
) {
}