package com.nutrifacil.app.ENUM;

import lombok.Getter;

@Getter
public enum DietObjective {
    EMAGRECIMENTO("Emagrecimento"),
    HIPERTROFIA("Hipertrofia");

    private final String description;

    DietObjective(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return getDescription();
    }
}
