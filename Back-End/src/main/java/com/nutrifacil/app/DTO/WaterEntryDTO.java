package com.nutrifacil.app.DTO;

import java.time.LocalDateTime;
import java.util.UUID;

public record WaterEntryDTO(
        UUID id,
        Double amountConsumed,
        LocalDateTime consumedAt
) {
}
