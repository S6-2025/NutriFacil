package com.nutrifacil.app.Services;

import com.nutrifacil.app.DTO.DietDTO;
import com.nutrifacil.app.DTO.UpdateUserDTO;
import com.nutrifacil.app.DTO.UserDTO;
import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.UUID;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO getUserInfo(String username) {
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        return UserMapper.mapUser(user);
    }

    public User updateUser(String username, UpdateUserDTO updateInfo) {
        User user = repository.findByUsername(username).orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        repository.save(UserMapper.checkAndUpdateFields(user, updateInfo, passwordEncoder));
        return user;
    }

    public void deleteUser(String username) {
        var user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Não foi possivel encontrar o usuário!"));
        repository.delete(user);
    }
}

@RequiredArgsConstructor
class UserMapper {

    public static UserDTO mapUser(User user) {
        return new UserDTO(
                user.getUsername(),
                user.getProfile().getFullname(),
                user.getProfile().getEmail(),
                user.getProfile().getBirthdate(),
                user.getProfile().getGender(),
                user.getProfile().getHeight(),
                user.getProfile().getWeight(),
                new DietDTO(
                        user.getProfile().getDiet().getObjective(),
                        user.getProfile().getDiet().getType(),
                        user.getProfile().getDiet().getPhysicalActivityStatus()
                ),
                user.getProfile().getAllergies()
        );

    }

    public static User checkAndUpdateFields(User user, UpdateUserDTO updateData, PasswordEncoder passwordEncoder) {
        Field[] fields = updateData.getClass().getDeclaredFields();

        for (Field field : fields) {

            try {
                field.setAccessible(true);
                Object value = field.get(updateData);

                if (value != null) {
                    String fieldName = field.getName();
                    try {
                        Field userField = user.getClass().getDeclaredField(fieldName);
                        userField.setAccessible(true);
                        if (fieldName.equals("password")) {
                            userField.set(user, passwordEncoder.encode((CharSequence) value));
                        } else {
                            userField.set(user, value);
                        }

                        userField.setAccessible(false);
                    } catch (NoSuchFieldException e) {
                        System.out.println("Aviso: O campo '" + fieldName + "' existe no DTO, mas não na entidade User.");
                        try {
                            Field userField = user.getProfile().getClass().getDeclaredField(fieldName);
                            userField.setAccessible(true);

                            userField.set(user.getProfile(), value);
                            userField.setAccessible(false);
                        } catch (NoSuchFieldException ex) {
                            System.out.println("Aviso: O campo '" + fieldName + "' existe no DTO, mas não na entidade Profile.");
                        }
                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return user;
    }
}


