package com.nutrifacil.app.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.nutrifacil.app.ENUM.DietObjective;
import com.nutrifacil.app.ENUM.DietType;
import com.nutrifacil.app.ENUM.Gender;
import com.nutrifacil.app.ENUM.PhysicalActivityStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

@Entity
@Table(name = "diets")
@Getter
@Setter
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    @JsonBackReference
    private Profile profile;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DietObjective objective;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DietType type;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PhysicalActivityStatus physicalActivityStatus;

    @Column
    private Double imc;

    @Column
    private Double tmb;

    @Column(name = "calories_consume_per_day")
    private Double caloriesCosume;

    @Column(name = "water_consume_per_day")
    private Double waterConsume;

    public void setImc() {
        this.imc = (double) Math.round(profile.getWeight() / Math.pow(profile.getHeight(), 2));
    }

    public void setWaterConsume() {
        this.waterConsume = (double) Math.round(0.035 * profile.getWeight());
    }

    public void setTmb() {
        int age = Period.between(profile.getBirthdate(), LocalDate.now()).getYears();
        if (profile.getGender().equals(Gender.MASCULINO)) {
            this.tmb = (10 * profile.getWeight()) + (6.25 * profile.getHeight() * 100) - (5 * age) + 5;
        } else {
            this.tmb = (double) Math.round((10 * profile.getWeight()) + (6.25 * profile.getHeight() * 100) - (5 * age) - 161);
        }
    }

    public void setCaloriesConsume() {
        Double multiplyFactor = 1d;
        int plusFactor = 0;
        switch (getPhysicalActivityStatus()) {
            case SEDENTARIO -> multiplyFactor = 1.2;
            case LEVE -> multiplyFactor = 1.375;
            case MEDIO -> multiplyFactor = 1.55;
            case ALTO -> multiplyFactor = 1.725;
        }
        switch (getObjective()) {
            case HIPERTROFIA -> plusFactor = 300;
            case EMAGRECIMENTO -> plusFactor = -500;
        }

        this.caloriesCosume = (double) Math.round(getTmb() * multiplyFactor + plusFactor);
    }
}
