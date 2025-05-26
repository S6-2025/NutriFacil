package com.nutrifacil.app.Services;

import com.nutrifacil.app.DTO.UserDTO;
import com.nutrifacil.app.Repositories.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final ProfileRepository profileRepository;

    public UserDTO getUserByUsername(String usename){
        return profileRepository.findByUserUsername(usename)
                .map(UserDTO::new)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }


}
