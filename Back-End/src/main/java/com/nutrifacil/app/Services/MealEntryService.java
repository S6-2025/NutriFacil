package com.nutrifacil.app.Services;

import com.nutrifacil.app.DTO.CreateMealEntryRequestDTO;
import com.nutrifacil.app.DTO.DailyMealTrackerResponseDTO;
import com.nutrifacil.app.DTO.MealEntryDTO;
import com.nutrifacil.app.Models.Food;
import com.nutrifacil.app.Models.MealEntry;
import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Repositories.FoodRepository;
import com.nutrifacil.app.Repositories.MealEntryRepository;
import com.nutrifacil.app.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MealEntryService {

    private final MealEntryRepository mealRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;


    public MealEntry createMealEntry(CreateMealEntryRequestDTO data) {
        Profile profile = userRepository.findByUsername(data.username())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"))
                .getProfile();

        Food food = foodRepository.findFoodByName(data.foodName())
                .orElseThrow(() -> new RuntimeException("Food not found"));

        Double calories = (food.getCaloriesPer100grams() / 100.0) * data.amountConsumed();

        MealEntry newEntry = new MealEntry();
        newEntry.setFood(food);
        newEntry.setUserProfile(profile);
        newEntry.setAmountConsumed(data.amountConsumed());
        newEntry.setCaloriesConsumed(calories);
        newEntry.setMealType(data.mealType());
        newEntry.setConsumedAt(data.consumedAt() != null ? data.consumedAt() : LocalDateTime.now());

        return mealRepository.save(newEntry);
    }

    public DailyMealTrackerResponseDTO getDailySummary(String username, LocalDate date) {

        Profile profile = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"))
                .getProfile();

        Double caloriesGoal = profile.getDiet().getCaloriesCosume();

        LocalDateTime periodStart = date.atStartOfDay();
        LocalDateTime periodEnd = date.atTime(23, 59, 59);

        List<MealEntry> todayEntries = mealRepository.findAllWithFoodByUserProfileAndDateRange(profile, periodStart, periodEnd)
                .orElse(new ArrayList<>());

        Double totalCalories = 0.0;

        List<MealEntryDTO> entryDTOS = new ArrayList<>();

        if (!todayEntries.isEmpty()) {
            entryDTOS = mappingDTO(todayEntries);
            totalCalories = todayEntries.stream()
                    .mapToDouble(MealEntry::getCaloriesConsumed)
                    .sum();
        }


        return new DailyMealTrackerResponseDTO(
                date, caloriesGoal, totalCalories, (caloriesGoal - totalCalories), entryDTOS
        );
    }


    private List<MealEntryDTO> mappingDTO(List<MealEntry> entries) {
        List<MealEntryDTO> mapped = new ArrayList<>();
        for (MealEntry entry : entries) {
            mapped.add(
                    new MealEntryDTO(
                            entry.getId(),
                            entry.getFood().getName(),
                            entry.getAmountConsumed(),
                            entry.getCaloriesConsumed(),
                            entry.getMealType(),
                            entry.getConsumedAt()
                    )
            );
        }
        return mapped;
    }
}
