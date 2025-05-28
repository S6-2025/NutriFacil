package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.DTO.LoginRequestDTO;
import com.nutrifacil.app.DTO.RegisterRequestDTO;
import com.nutrifacil.app.Infra.Security.TokenService;
import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private final UserRepository repository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final TokenService tokenService;

    public AuthController(UserRepository repository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        User user = this.repository.findByUsername(body.username()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if(passwordEncoder.matches(body.password(),user.getPassword())){
            String token = tokenService.generateToken(user);
            return ResponseEntity.ok(token); //? Caso senha seja igual, retorna o token do usuário
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body){
        if(this.repository.findByUsername(body.username()).isPresent()){
            throw new RuntimeException("Usuário já cadastrado");

        }
        User user = new User();
        user.setUsername(body.username());
        user.setPassword(passwordEncoder.encode(body.password()));

        Profile profile = new Profile();
        profile.setFullname(body.fullname());
        profile.setEmail(body.email());
        profile.setGender(body.gender());
        profile.setAge(body.age());
        profile.setWeight(body.weight());
        profile.setHeight(body.height());
        profile.setUser(user);
        user.setUserProfile(profile);

        this.repository.save(user);
        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(token);//? Apos registrar, retorna o token do usuário
//        Optional<User> user = this.repository.findByUsername(body.username());
//        if(user.isEmpty()){
//            User newUser = new User();
//            newUser.setPassword(passwordEncoder.encode(body.password()));
//            newUser.setUsername(body.username());
//            this.repository.save(newUser);
//            String token = tokenService.generateToken(newUser);
//            return ResponseEntity.ok(token);
//        }
//        return ResponseEntity.badRequest().build();
    }
}
