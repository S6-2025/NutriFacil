package com.nutrifacil.app.DTO;

import com.nutrifacil.app.Enums.Gender;
import com.nutrifacil.app.Models.Diet;


public record RegisterRequestDTO(
        String username,
        String password,
        String fullname,
        String email,
        Gender gender,
        int age,
        Double weight,
        Double height,
        DietDTO diet
        ) {
}
