package com.nutrifacil.app.DTO;

import com.nutrifacil.app.Enums.DietObjective;
import com.nutrifacil.app.Enums.DietType;
import com.nutrifacil.app.Enums.Gender;
import com.nutrifacil.app.Models.Food;
import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Services.DietService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public record UserDTO(
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
        List<Food> avaiableFoods
) {
    public UserDTO(Profile profile) {
        this(
                profile.getUser().getUsername(),
                profile.getFullname(),
                profile.getEmail(),
                profile.getGender(),
                profile.getBirthdate(),
                profile.getWeight(),
                profile.getHeight(),
                profile.getImc(),
                profile.getTmb(),
                profile.getDiet().getObjective(),
                profile.getDiet().getType(),
                profile.getDiet().getCaloriesPerDay(),
                profile.getAllergies(),
                List.of()
        );
    }
}
