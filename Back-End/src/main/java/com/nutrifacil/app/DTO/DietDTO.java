package com.nutrifacil.app.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nutrifacil.app.Enums.DietObjective;
import com.nutrifacil.app.Enums.DietType;
import com.nutrifacil.app.Enums.PhysicalActivityStatus;

import java.util.List;

public record DietDTO(
        DietObjective objective,
        DietType type,
        PhysicalActivityStatus physicalActivityStatus,
        List<String> allergies
) {

}
