package com.nutrifacil.app.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "foods")
@Getter
@Setter
@RequiredArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private final @NotNull String name;

    @Column
    private Double totalCalories;

    @Column
    private Double protein;

    @Column
    private Double carbohydrate;

    @Column
    private Double fat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diet_id", referencedColumnName = "id")
    private Diet diet;


    public Food() {
        this.name = "";
    }
}
