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
        this.imc = profile.getWeight() / Math.pow(profile.getHeight(), 2);
    }

    public void setWaterConsume() {
        this.waterConsume = 0.035 * profile.getWeight();
    }

    public void setTmb() {
        if (profile.getGender().equals(Gender.MASCULINO)) {
            this.tmb = 10 * profile.getWeight() + 6.25 * profile.getHeight();
        }
    }
}
