package com.nutrifacil.app.Controllers;


import com.nutrifacil.app.DTO.UserLoginDTO;
import com.nutrifacil.app.DTO.UserRegisterDTO;
import com.nutrifacil.app.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {


    @Autowired
    private final AuthService service;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserLoginDTO body) {
        try {
            return service.login(body);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserRegisterDTO body) {
        try {
            System.out.println(body);
            return service.register(body);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
