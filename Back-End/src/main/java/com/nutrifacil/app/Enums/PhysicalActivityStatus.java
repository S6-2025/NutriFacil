package com.nutrifacil.app.Enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

@Getter
public enum PhysicalActivityStatus {
    SEDENTARY("Sedentary"),
    LIGHTLY_ACTIVE("Lightly active"),
    MODERATELY_ACTIVE("Moderately active"),
    VERY_ACTIVE("Very active");

    private final String description;

    PhysicalActivityStatus(String description){
        this.description = description;
    }

    @Override
    public String toString() {
        return getDescription();
    }

    @JsonCreator
    public static PhysicalActivityStatus forValue(String value) {
        System.out.println("DEBUG: PhysicalActivityStatus @JsonCreator chamado com valor: '" + value + "'");
        if (value == null) {
            System.out.println("DEBUG: Valor nulo recebido no @JsonCreator para PhysicalActivityStatus.");
            return null;
        }
        for (PhysicalActivityStatus status : values()) {
            if (status.name().equalsIgnoreCase(value)) {
                System.out.println("DEBUG: Correspondência encontrada para PhysicalActivityStatus: " + status.name());
                return status;
            }
        }
        System.out.println("DEBUG: Nenhuma correspondência encontrada no @JsonCreator para PhysicalActivityStatus com valor: '" + value + "'");
        // Você pode lançar uma exceção aqui em vez de retornar null se preferir
        // throw new IllegalArgumentException("Valor inválido para PhysicalActivityStatus: " + value);
        return null;
    }
}
