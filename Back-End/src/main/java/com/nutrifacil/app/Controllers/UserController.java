package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.DTO.UserDTO;
import com.nutrifacil.app.Services.DietService;
import com.nutrifacil.app.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final DietService dietService;

    public UserController(UserService userService, DietService dietService) {
        this.userService = userService;
        this.dietService = dietService;
    }

    @GetMapping("")
    public ResponseEntity<String> getUsers() {
        return ResponseEntity.ok("DEU CERTO");
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<Object> getUserByUsername(@PathVariable String username) {
        try {
            UserDTO user = userService.getUserByUsername(username);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }
    }

    @GetMapping("/user/{username}/diet")
    public ResponseEntity<Object> getUserDiet(@PathVariable String username) {
        try {
            UserDTO user = userService.getUserByUsername(username);

        } catch (Exception e) {

        }
        return ResponseEntity.ok("");
    }

}
