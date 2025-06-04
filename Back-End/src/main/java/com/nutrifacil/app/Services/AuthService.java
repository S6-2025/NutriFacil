package com.nutrifacil.app.Services;

import com.nutrifacil.app.DTO.DietDTO;
import com.nutrifacil.app.DTO.RegisterRequestDTO;
import com.nutrifacil.app.Infra.Security.TokenService;
import com.nutrifacil.app.Models.Diet;
import com.nutrifacil.app.Models.Food;
import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository repository ;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final TokenService tokenService;

    public ResponseEntity<Object> register(RegisterRequestDTO userData){
        if(this.repository.findByUsername(userData.username()).isPresent()){
            throw new RuntimeException("Usuário já cadastrado");
        }
        Profile profile = new Profile();
        User user = new User();
        Diet diet = new Diet();
        //Updating User info
        user.setUsername(userData.username());
        user.setPassword(passwordEncoder.encode(userData.password()));
        //Updating UserProfile info
        profile.setFullname(userData.fullname());
        profile.setEmail(userData.email());
        profile.setAge(userData.age());
        profile.setHeight(userData.height());
        profile.setWeight(userData.weight());

        //Updating Diet info
        diet.setType(userData.diet().type());
        diet.setObjective(userData.diet().objective());
        diet.setFoods(setFoodList(userData.diet().proteins(), userData.diet().vegetables(), userData.diet().fruits()));

        profile.setDiet(diet);
        profile.setUser(user);
        user.setUserProfile(profile);
        diet.setUserProfile(profile);

        this.repository.save(user);
        String token = tokenService.generateToken(user);
        HashMap<String, String> resp = new HashMap<>();
        resp.put("token", token);
        return ResponseEntity.ok(resp);

    }

    private List<Food> setFoodList(List<String> proteins, List<String> vegetables, List<String> fruits){
        List<Food> foods = new ArrayList<>();
        for(String protein : proteins){
            foods.add(new Food(protein));
        }
        for(String vegetable : vegetables){
            foods.add(new Food(vegetable));
        }
        for(String fruit : fruits){
            foods.add(new Food(fruit));
        }
        return foods;
    }



}
