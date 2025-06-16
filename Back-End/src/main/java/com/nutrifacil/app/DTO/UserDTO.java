package com.nutrifacil.app.DTO;


import com.nutrifacil.app.ENUM.AllergyGroup;
import com.nutrifacil.app.ENUM.Gender;

import java.time.LocalDate;
import java.util.List;

public record UserDTO(
        String username,
        String fullname,
        String email,
        LocalDate birthDate,
        Gender gender,
        Double height,
        Double weight,
        DietDTO diet,
        List<AllergyGroup> allergies
) {
}
