package com.nutrifacil.app.DTO;

import com.nutrifacil.app.Enums.DietObjective;
import com.nutrifacil.app.Enums.DietType;
import com.nutrifacil.app.Enums.Gender;

import java.time.LocalDate;
import java.util.List;

public record UserProfileDTO(
        String username,
        String fullname,
        String email,
        Gender gender,
        LocalDate birthdate,
        Double weight,
        Double height,
        Double imc,
        Double tmb,
        DietObjective dietObjective,
        DietType dietType,
        Double caloriesPerDay,
        List<String> allergies,
        List<FoodDTO> availableFoods
) {
}

record FoodDTO(
        String name,
        Double calories,
        String category,
        List<String> suitableDiets,
        String allergyGroup
) {
}
