package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.DTO.CreateMealEntryRequestDTO;
import com.nutrifacil.app.DTO.CreateWaterEntryRequestDTO;
import com.nutrifacil.app.DTO.DailyMealTrackerResponseDTO;
import com.nutrifacil.app.DTO.DailyWaterTrackerResponseDTO;
import com.nutrifacil.app.Services.MealEntryService;
import com.nutrifacil.app.Services.WaterEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/tracker")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TrackerController {

    private final MealEntryService mealService;
    private final WaterEntryService waterService;


    @GetMapping("/daily")
    public ResponseEntity<Object> getDailySummary(
            @RequestParam(name = "username", required = true, defaultValue = "") String username,
            @RequestParam(name = "date", required = false, defaultValue = "") LocalDate date) {
        try {
            DailyMealTrackerResponseDTO mealTracker = mealService.getDailySummary(username, date);
            DailyWaterTrackerResponseDTO waterTracker = waterService.getDailySummary(username, date);

            return ResponseEntity.ok(new DailyTrackerResponse(mealTracker, waterTracker));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/meal_entry")
    public ResponseEntity<Object> sendNewMealEntry(@RequestBody CreateMealEntryRequestDTO data) {
        try {
            return ResponseEntity.ok(mealService.createMealEntry(data));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/water_entry")
    public ResponseEntity<Object> sendNewWaterEntry(@RequestBody CreateWaterEntryRequestDTO data) {
        try {
            return ResponseEntity.ok(waterService.createWaterEntry(data));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}


record DailyTrackerResponse(
        DailyMealTrackerResponseDTO mealTracker,
        DailyWaterTrackerResponseDTO waterTracker
) {
}