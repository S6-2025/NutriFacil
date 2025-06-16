package com.nutrifacil.app.DTO;

import java.time.LocalDate;

public record DailyMealRequestDTO(
        String username,
        LocalDate date
) {
}
