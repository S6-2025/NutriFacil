package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.DTO.DietDTO;
import com.nutrifacil.app.Models.Diet;
import com.nutrifacil.app.Services.DietService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/diet")
@RequiredArgsConstructor
public class DietController {
    @Autowired
    private final DietService service;


    @GetMapping("/{username}")
    public ResponseEntity<Object> getDietByUsername(@PathVariable String username) {
        try {
            Diet diet = service.getDietByUsename(username);
            return ResponseEntity.ok(diet);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Nenhuma Dieta encontrada");
        }
    }

    @PatchMapping("/{username}")
    public ResponseEntity<Object> updateDiet(@PathVariable String username, @RequestBody DietDTO updateData) {
        try {
            Diet diet = service.updateDiet(username, updateData);
            return ResponseEntity.ok(diet);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/{username}/foods/available")
    public ResponseEntity<Object> getAvailableFoods(@PathVariable String username) {
        try {
            Diet diet = service.getDietByUsename(username);
            return ResponseEntity.ok(service.getAvaiablesFoods(diet));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Nenhuma comida encontrada");
        }
    }
}
