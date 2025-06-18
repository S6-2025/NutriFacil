package com.nutrifacil.app.Services;

import com.nutrifacil.app.DTO.CreateWaterEntryRequestDTO;
import com.nutrifacil.app.DTO.DailyWaterTrackerResponseDTO;
import com.nutrifacil.app.DTO.MealEntryDTO;
import com.nutrifacil.app.DTO.WaterEntryDTO;
import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Models.WaterEntry;
import com.nutrifacil.app.Repositories.UserRepository;
import com.nutrifacil.app.Repositories.WaterEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WaterEntryService {
    private final WaterEntryRepository waterRepository;
    private final UserRepository userRepository;

    public WaterEntry createWaterEntry(CreateWaterEntryRequestDTO data) {
        Profile profile = userRepository.findByUsername(data.username())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"))
                .getProfile();

        WaterEntry newEntry = new WaterEntry();
        newEntry.setAmountConsumed(data.amountConsumed());
        newEntry.setUserProfile(profile);
        newEntry.setConsumedAt(data.consumedAt() != null ? data.consumedAt() : LocalDateTime.now());

        return waterRepository.save(newEntry);
    }

    public DailyWaterTrackerResponseDTO getDailySummary(String username, LocalDate date) {
        Profile profile = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"))
                .getProfile();

        LocalDateTime periodStart = date.atStartOfDay();
        LocalDateTime periodEnd = date.atTime(23, 59, 59);

        List<WaterEntry> todayEntries = waterRepository.findAllByUserProfileAndDateRange(profile, periodStart, periodEnd)
                .orElse(new ArrayList<>());

        List<WaterEntryDTO> entryDTOs = new ArrayList<>();
        Double totalConsumed = 0.0;
        Double waterGoal = profile.getDiet().getWaterConsume();

        if (!todayEntries.isEmpty()) {
            entryDTOs = mappingDTO(todayEntries);
            totalConsumed = todayEntries.stream()
                    .mapToDouble(WaterEntry::getAmountConsumed)
                    .sum();
        }


        return new DailyWaterTrackerResponseDTO(
                date, waterGoal, totalConsumed, (waterGoal - totalConsumed), entryDTOs
        );
    }

    private List<WaterEntryDTO> mappingDTO(List<WaterEntry> entries) {
        List<WaterEntryDTO> mapped = new ArrayList<>();
        for (WaterEntry entry : entries) {
            mapped.add(
                    new WaterEntryDTO(
                            entry.getId(),
                            entry.getAmountConsumed(),
                            entry.getConsumedAt()
                    )
            );
        }
        return mapped;
    }
}


