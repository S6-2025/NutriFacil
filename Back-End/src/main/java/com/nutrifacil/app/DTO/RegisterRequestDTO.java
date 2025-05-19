package com.nutrifacil.app.DTO;

import com.nutrifacil.app.Enums.Gender;

public record RegisterRequestDTO(
        String username,
        String password,
        String fullname,
        String email,
        Gender gender,
        int age,
        Double weight,
        Double height
        ) {
}
