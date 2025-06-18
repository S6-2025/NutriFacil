package com.nutrifacil.app.DTO;

import java.time.LocalDate;
import java.util.List;

public record DailyWaterTrackerResponseDTO(
        LocalDate date,
        Double waterGoal,
        Double waterConsumed,
        Double waterRemaining,
        List<WaterEntryDTO> entries
) {
}
