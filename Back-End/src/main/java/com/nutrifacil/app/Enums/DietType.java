package com.nutrifacil.app.Enums;

import lombok.Getter;

@Getter
public enum DietType {
    VEGETARIANA("Vegetariana"),
    LOW_CARB("Low Carb"),
    MEDITERRANEA("Mediterrânea"),
    CETOGENICA("Cetogênica");

    private String descricao;

    DietType(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return getDescricao();
    }
}
