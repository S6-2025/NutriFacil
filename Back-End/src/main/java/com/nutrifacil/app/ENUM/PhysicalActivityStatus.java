package com.nutrifacil.app.ENUM;

import lombok.Getter;

@Getter
public enum PhysicalActivityStatus {
    SEDENTARIO("Sedentary"),
    LEVE("Lightly active"),
    MEDIO("Moderately active"),
    ALTO("Very active");

    private final String description;

    PhysicalActivityStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return getDescription();
    }
}