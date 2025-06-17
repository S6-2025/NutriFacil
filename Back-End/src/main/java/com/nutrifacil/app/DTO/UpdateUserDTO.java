package com.nutrifacil.app.DTO;


import com.nutrifacil.app.ENUM.AllergyGroup;
import com.nutrifacil.app.ENUM.Gender;

import java.time.LocalDate;
import java.util.List;

public record UpdateUserDTO(
        String fullname,
        String password,
        Gender gender,
        LocalDate birthdate,
        String email,
        String phone,
        Double weight,
        Double height,
        DietDTO diet,
        List<AllergyGroup> allergies
) {
}
