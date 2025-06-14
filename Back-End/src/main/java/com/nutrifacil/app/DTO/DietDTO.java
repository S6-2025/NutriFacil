package com.nutrifacil.app.DTO;

import com.nutrifacil.app.ENUM.DietObjective;
import com.nutrifacil.app.ENUM.DietType;
import com.nutrifacil.app.ENUM.PhysicalActivityStatus;

public record DietDTO(
        DietObjective objective,
        DietType type,
        PhysicalActivityStatus physicalActivityStatus
) {

}
