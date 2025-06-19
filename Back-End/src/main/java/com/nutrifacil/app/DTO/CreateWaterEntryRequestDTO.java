package com.nutrifacil.app.DTO;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateWaterEntryRequestDTO(
        @NotNull String username,
        @NotNull Double amountConsumed,
        LocalDateTime consumedAt
) {
}
