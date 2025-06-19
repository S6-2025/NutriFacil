package com.nutrifacil.app.ENUM;


import lombok.Getter;

@Getter
public enum AllergyGroup {
    LACTOSE("Lactose"),
    GLUTEN("Glúten"),
    PROTEINA_DO_LEITE("Proteína do Leite"),
    OVO("Ovo"),
    FRUTOS_DO_MAR("Frutos do Mar"),
    NONE("Nenhuma");

    private final String description;

    AllergyGroup(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return getDescription();
    }

}
