package com.nutrifacil.app.ENUM;

import lombok.Getter;

@Getter
public enum DietType {
    VEGETARIANA("Vegetariana"),
    LOW_CARB("Low Carb"),
    MEDITERRANEA("Mediterrânea"),
    CETOGENICA("Cetogênica"),
    ALL("Todas");

    private final String description;

    DietType(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return getDescription();
    }
}
