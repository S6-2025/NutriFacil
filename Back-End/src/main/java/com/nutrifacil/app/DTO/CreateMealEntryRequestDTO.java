package com.nutrifacil.app.DTO;

import com.nutrifacil.app.ENUM.MealType;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreateMealEntryRequestDTO(
        @NotNull String username,
        @NotNull String foodName,
        @NotNull Double amountConsumed,
        @NotNull MealType mealType,
        LocalDateTime consumedAt
) {
}
