package com.nutrifacil.app.Services;

import com.nutrifacil.app.Enums.AllergyGroup;
import com.nutrifacil.app.Enums.DietType;
import com.nutrifacil.app.Enums.FoodCategory;
import com.nutrifacil.app.Models.Diet;
import com.nutrifacil.app.Models.Food;
import com.nutrifacil.app.Repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
public class DietService {
    @Autowired
    private final FoodRepository foodRepository;

    public DietService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }


    public List<Food> generateAvaiableFoods(Diet userDiet, List<String> userAllergies) {
        List<Food> allFoods = new ArrayList<>();
        try {
            allFoods = foodRepository.findAll();
        } catch (NullPointerException e) {
            this.registerFoods();
            generateAvaiableFoods(userDiet, userAllergies);
        }


        final Set<String> allergies = new HashSet<>(userAllergies.contains("Nenhuma") ? Collections.emptyList() : userAllergies);

        if (allergies.isEmpty()) {
            return allFoods.stream()
                    .filter(food -> food.getDietType().contains(userDiet.getType()))
                    .toList();
        }
        return allFoods.stream()
                .filter(food -> !allergies.contains(food.getAllergyGroup().getDescription()))
                .toList();
    }

    private void registerFoods() {

        // --- PROTEÍNAS ---
        List<Food> PROTEINS = List.of(
                new Food("Frango", 165.0, List.of(DietType.LOW_CARB, DietType.CETOGENICA, DietType.MEDITERRANEA), FoodCategory.PROTEIN, AllergyGroup.NONE),
                new Food("Carne bovina", 250.0, List.of(DietType.CETOGENICA, DietType.LOW_CARB), FoodCategory.PROTEIN, AllergyGroup.NONE),
                new Food("Peixe", 200.0, List.of(DietType.MEDITERRANEA, DietType.LOW_CARB, DietType.CETOGENICA), FoodCategory.PROTEIN, AllergyGroup.FRUTOS_DO_MAR), // Peixe é um alérgeno comum (Frutos do Mar)
                new Food("Tofu", 76.0, List.of(DietType.VEGETARIANA, DietType.LOW_CARB, DietType.MEDITERRANEA), FoodCategory.PROTEIN, AllergyGroup.NONE), // Soja é um alérgeno, mas não está na sua lista de Enums.
                new Food("Grão de bico", 139.0, List.of(DietType.VEGETARIANA, DietType.MEDITERRANEA), FoodCategory.PROTEIN, AllergyGroup.NONE)
        );

        // --- CARBOIDRATOS ---
        List<Food> CARBS = List.of(
                new Food("Arroz", 130.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.CARBHYDRATES, AllergyGroup.NONE),
                new Food("Batata", 87.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.CARBHYDRATES, AllergyGroup.NONE),
                new Food("Pão", 265.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.CARBHYDRATES, AllergyGroup.GLUTEN), // Pão tradicional contém glúten.
                new Food("Milho", 96.0, List.of(DietType.VEGETARIANA), FoodCategory.CARBHYDRATES, AllergyGroup.NONE),
                new Food("Aveia", 71.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.CARBHYDRATES, AllergyGroup.NONE) // Aveia pura não tem glúten, mas a contaminação cruzada é comum.
        );

        // --- FRUTAS ---
        List<Food> FRUITS = List.of(
                new Food("Banana", 89.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.FRUITS, AllergyGroup.NONE),
                new Food("Maçã", 52.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.FRUITS, AllergyGroup.NONE),
                new Food("Laranja", 47.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.FRUITS, AllergyGroup.NONE),
                new Food("Morango", 32.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA, DietType.LOW_CARB), FoodCategory.FRUITS, AllergyGroup.NONE),
                new Food("Melancia", 30.0, List.of(DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.FRUITS, AllergyGroup.NONE)
        );

        // --- VEGETAIS ---
        List<Food> VEGETABLES = List.of(
                new Food("Brócolis", 34.0, List.of(DietType.ALL, DietType.CETOGENICA, DietType.LOW_CARB, DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.VEGETABLES, AllergyGroup.NONE),
                new Food("Cenoura", 41.0, List.of(DietType.ALL, DietType.MEDITERRANEA, DietType.VEGETARIANA, DietType.LOW_CARB), FoodCategory.VEGETABLES, AllergyGroup.NONE),
                new Food("Alface", 15.0, List.of(DietType.ALL, DietType.CETOGENICA, DietType.LOW_CARB, DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.VEGETABLES, AllergyGroup.NONE),
                new Food("Tomate", 18.0, List.of(DietType.ALL, DietType.MEDITERRANEA, DietType.VEGETARIANA, DietType.LOW_CARB), FoodCategory.VEGETABLES, AllergyGroup.NONE),
                new Food("Espinafre", 23.0, List.of(DietType.ALL, DietType.CETOGENICA, DietType.LOW_CARB, DietType.MEDITERRANEA, DietType.VEGETARIANA), FoodCategory.VEGETABLES, AllergyGroup.NONE)
        );

        List<Food> allFoodsRegister = Stream.of(VEGETABLES, PROTEINS, CARBS, FRUITS)
                .flatMap(List::stream)
                .toList();

        foodRepository.saveAll(allFoodsRegister);

    }
}
