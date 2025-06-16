package com.nutrifacil.app.Services;

import com.nutrifacil.app.DTO.UpdateUserDTO;
import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository repository;

    public User updateUser(String username, UpdateUserDTO updateInfo) {
        User user = repository.findByUsername(username).orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (updateInfo.fullname() != null) {
            user.getProfile().setFullname(updateInfo.fullname());
        }
        if (updateInfo.email() != null) {
            user.getProfile().setEmail(updateInfo.email());
        }

        if (updateInfo.height() != null) {
            user.getProfile().setHeight(updateInfo.height());
        }
        if (updateInfo.weight() != null) {
            user.getProfile().setWeight(updateInfo.weight());
        }

        return user;
    }

    public void deleteUser(String username) {
        var user = repository.findByUsername(username).orElseThrow(() -> new RuntimeException("Não foi possivel encontrar o usuário!"));
        repository.delete(user);
    }
}
