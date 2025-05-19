package com.nutrifacil.app.DTO;

import com.nutrifacil.app.Enums.Gender;
import com.nutrifacil.app.Models.Profile;

public record UserDTO(
        String username,
        String fullname,
        String email,
        Gender gender,
        int age,
        Double weight,
        Double height,
        Double imc,
        Double tmb
) {
    public UserDTO(Profile profile){
        this(
                profile.getUser().getUsername(),
                profile.getFullname(),
                profile.getEmail(),
                profile.getGender(),
                profile.getAge(),
                profile.getWeight(),
                profile.getHeight(),
                profile.getImc(),
                profile.getTmb()
        );
    }
}
