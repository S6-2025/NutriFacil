package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.Models.Food;
import com.nutrifacil.app.Services.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class FoodController {

    @Autowired
    private final FoodService service;


    @PostMapping("")
    public ResponseEntity<Object> register(@RequestBody List<Food> foods) {
        try {
            for (Food f : foods) {
                service.register(f);
            }
            return ResponseEntity.ok("Criado!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
