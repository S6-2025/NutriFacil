package com.nutrifacil.app.DTO;

import com.nutrifacil.app.Enums.Gender;

import java.time.LocalDate;


public record RegisterRequestDTO(
        String username,
        String password,
        String fullname,
        String email,
        Gender gender,
        String birthdate,
        Double weight,
        Double height,
        DietDTO diet
        ) {
}
