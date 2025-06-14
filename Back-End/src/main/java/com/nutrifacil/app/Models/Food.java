package com.nutrifacil.app.Models;

import com.nutrifacil.app.ENUM.AllergyGroup;
import com.nutrifacil.app.ENUM.DietType;
import com.nutrifacil.app.ENUM.FoodCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "foods")
@Getter
@Setter
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double caloriesPer100grams;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private List<DietType> dietTypes;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FoodCategory category;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AllergyGroup allergyGroup;
}
