package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.DTO.LoginRequestDTO;
import com.nutrifacil.app.DTO.RegisterRequestDTO;
import com.nutrifacil.app.Infra.Security.TokenService;
import com.nutrifacil.app.Models.Profile;
import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Repositories.UserRepository;
import com.nutrifacil.app.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final UserRepository repository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final TokenService tokenService;

    @Autowired
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDTO body) {
        User user = this.repository.findByUsername(body.username()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            HashMap<String, String> resp = new HashMap<>();
            resp.put("token", token);
            return ResponseEntity.ok(resp); //? Caso senha seja igual, retorna o token do usuário
        }
        return ResponseEntity.badRequest().body("Senha incorreta");
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequestDTO body) {
        try {
            return ResponseEntity.ok(authService.register(body));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
