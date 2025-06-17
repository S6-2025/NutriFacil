package com.nutrifacil.app.DTO;


import com.nutrifacil.app.ENUM.Gender;

import java.time.LocalDate;

public record UpdateUserDTO(
        String fullname,
        String passwor,
        Gender gender,
        LocalDate birthDate,
        String email,
        String phone,
        Double weight,
        Double height
) {
}
