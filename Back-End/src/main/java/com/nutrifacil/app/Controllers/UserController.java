package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.DTO.UpdateUserDTO;
import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService service;

    @GetMapping("/{username}")
    public ResponseEntity<Object> getUserInfo(@PathVariable String username) {
        try {
            return ResponseEntity.ok(service.getUserInfo(username));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PatchMapping("/{username}")
    public ResponseEntity<Object> updateUser(@PathVariable String username, @RequestBody UpdateUserDTO updateData) {
        try {
            User currUser = service.updateUser(username, updateData);
            return ResponseEntity.ok(currUser);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Object> deleteUser(@PathVariable String username) {
        try {
            service.deleteUser(username);
            return ResponseEntity.ok("Usuário deletado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
