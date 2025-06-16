package com.nutrifacil.app.DTO;

import com.nutrifacil.app.ENUM.MealType;

import java.time.LocalDateTime;
import java.util.UUID;

public record MealEntryDTO(
        UUID id,
        String foodName,
        Double amountConsumed,
        Double caloriesConsumed,
        MealType mealType,
        LocalDateTime consumedAt
) {
}
