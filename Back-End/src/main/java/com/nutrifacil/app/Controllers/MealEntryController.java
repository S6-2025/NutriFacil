package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.DTO.CreateMealEntryRequestDTO;
import com.nutrifacil.app.DTO.DailyMealRequestDTO;
import com.nutrifacil.app.Services.MealEntryService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/tracker")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MealEntryController {

    @Autowired
    private final MealEntryService service;


    @GetMapping("/daily")
    public ResponseEntity<Object> getDailySummary(@RequestBody DailyMealRequestDTO data) {
        try {
            return ResponseEntity.ok(service.getDailySummary(data.username(), data.date()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/meal_entry")
    public ResponseEntity<Object> sendNewMealEntry(@RequestBody CreateMealEntryRequestDTO data) {
        try {
            return ResponseEntity.ok(service.createMealEntry(data));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
