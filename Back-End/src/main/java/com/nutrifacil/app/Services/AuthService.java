package com.nutrifacil.app.Services;

import com.nutrifacil.app.DTO.UserLoginDTO;
import com.nutrifacil.app.DTO.UserRegisterDTO;
import com.nutrifacil.app.Infra.Security.TokenService;
import com.nutrifacil.app.Models.Diet;
import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;

import static java.util.Map.entry;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository repository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final TokenService tokenService;


    public ResponseEntity<Object> login(UserLoginDTO login) {
        User user = repository.findByUsername(login.username()).orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        if (passwordEncoder.matches(login.password(), user.getPassword())) {
            return ResponseEntity.ok(Map.ofEntries(
                    entry("token", tokenService.generateToken(user))
            ));
        }
        return ResponseEntity.badRequest().body("Senha incorreta!");
    }

    public ResponseEntity<Object> register(UserRegisterDTO userData) {
        if (this.repository.findByUsername(userData.username()).isPresent()) {
            throw new RuntimeException("Usuário já existe!");
        }

        User user = new User();
        Profile profile = new Profile();
        Diet diet = new Diet();

        //INFO: CONFIGURANDO USER
        user.setUsername(userData.username());
        user.setPassword(passwordEncoder.encode(userData.password()));

        //INFO: CONFIGURANDO PROFILE
        profile.setFullname(userData.fullname());
        profile.setEmail(userData.email());
        profile.setBirthdate(LocalDate.parse(userData.birthdate()));
        profile.setGender(userData.gender());
        profile.setWeight(userData.weight());
        profile.setHeight(userData.height());
        profile.setAllergies(userData.allergies());

        //INFO: CONFIGURANDO DIET
        diet.setObjective(userData.diet().objective());
        diet.setType(userData.diet().type());
        diet.setPhysicalActivityStatus(userData.diet().physicalActivityStatus());


        //INFO: ATRIBUINDO RELAÇÕES
        user.setProfile(profile);
        profile.setUser(user);
        profile.setDiet(diet);
        diet.setProfile(profile);
        diet.setImc();
        diet.setTmb();
        diet.setWaterConsume();
        this.repository.save(user);
        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(Map.ofEntries(
                entry("token", token)
        ));
    }

}