package com.nutrifacil.app.DTO;


import com.nutrifacil.app.ENUM.Gender;

public record UpdateUserDTO(
        String fullname,
        Gender gender,
        String email,
        Double weight,
        Double height
) {
}
