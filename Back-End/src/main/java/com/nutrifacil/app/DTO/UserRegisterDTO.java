package com.nutrifacil.app.DTO;

import com.nutrifacil.app.ENUM.*;

import java.util.List;

public record UserRegisterDTO(
        String username,
        String password,
        String fullname,
        String email,
        String phone,
        Gender gender,
        String birthdate,
        Double weight,
        Double height,
        List<AllergyGroup> allergies,
        DietDTO diet
) {
}

