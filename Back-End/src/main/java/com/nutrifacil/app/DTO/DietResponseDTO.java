package com.nutrifacil.app.DTO;

import com.nutrifacil.app.ENUM.DietObjective;
import com.nutrifacil.app.ENUM.DietType;
import com.nutrifacil.app.ENUM.PhysicalActivityStatus;
import com.nutrifacil.app.Models.Diet;

public record DietResponseDTO(
        DietObjective objective,
        DietType type,
        PhysicalActivityStatus physicalActivityStatus,
        Double imc,
        Double tmb,
        Double waterConsume,
        Double caloriesConsume
) {
    public static DietResponseDTO from(Diet diet) {
        return new DietResponseDTO(
                diet.getObjective(),
                diet.getType(),
                diet.getPhysicalActivityStatus(),
                diet.getImc(),
                diet.getTmb(),
                diet.getWaterConsume(),
                diet.getCaloriesCosume()
        );
    }
}
