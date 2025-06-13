package com.nutrifacil.app.Models;

import com.nutrifacil.app.Enums.AllergyGroup;
import com.nutrifacil.app.Enums.DietType;
import com.nutrifacil.app.Enums.FoodCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "foods")
@Getter
@Setter
@RequiredArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, length = 255)
    @NotNull
    private final @NotNull String name;

    @Column
    @NotNull
    private Double totalCalories;

    @ElementCollection(targetClass = DietType.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "food_diet_types", joinColumns = @JoinColumn(name = "food_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "diet_type", nullable = false)
    @NotNull
    private List<DietType> dietType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private FoodCategory category;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AllergyGroup allergyGroup;


    public Food() {
        this.name = "";
    }

    public Food(String name, Double totalCalories, List<DietType> dietType, FoodCategory foodCategory, AllergyGroup allergyGroup) {
        this.name = name;
        this.totalCalories = totalCalories;
        this.dietType = dietType;
        this.category = foodCategory;
        this.allergyGroup = allergyGroup;
    }


    @Override
    public String toString() {
        StringBuilder strb = new StringBuilder();
        strb.append("Food Name: ").append(getName());
        return strb.toString();
    }
}
