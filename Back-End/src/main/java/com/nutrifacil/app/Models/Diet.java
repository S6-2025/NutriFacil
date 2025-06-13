package com.nutrifacil.app.Models;

import com.nutrifacil.app.Enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import java.util.*;
import java.util.stream.Stream;

@Entity
@Table(name = "diet_information")
@Getter
@Setter
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_profile_id", referencedColumnName = "id")
    private Profile userProfile;

    @Enumerated(EnumType.STRING)
    private DietObjective objective;

    @Enumerated(EnumType.STRING)
    private PhysicalActivityStatus physicalActivityStatus;

    @Enumerated(EnumType.STRING)
    private DietType type;

    private Double caloriesPerDay;


//    public void setFoods(List<String> allergies) {
//        if (!this.foods.isEmpty()) {
//            this.foods.clear();
//        }
//
//        final Set<String> allergiesSet = new HashSet<>(allergies);
//        List<Food> temp = new ArrayList<>();
//        if (allergiesSet.contains("Nenhuma")) {
//            temp = Stream.of(CARBS, PROTEINS, FRUITS, VEGETABLES)
//                    .flatMap(List::stream)
//                    .filter(food -> food.getDietType().contains(this.getType()))
//                    .toList();
//        } else {
//            temp = Stream.of(CARBS, PROTEINS, FRUITS, VEGETABLES)
//                    .flatMap(List::stream)
//                    .filter(food -> !allergiesSet.contains(food.getAllergyGroup().getDescription()))
//                    .filter(food -> food.getDietType().contains(this.getType()))
//                    .toList();
//        }
//
//        this.foods = temp;
//
//    }
}