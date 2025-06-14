package com.nutrifacil.app.Repositories;

import com.nutrifacil.app.ENUM.AllergyGroup;
import com.nutrifacil.app.ENUM.FoodCategory;
import com.nutrifacil.app.Models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FoodRepository extends JpaRepository<Food, UUID> {
    Optional<Food> findFoodByName(String name);

    Optional<List<Food>> findFoodByAllergyGroup(AllergyGroup allergyGroup);

    Optional<List<Food>> findFoodByCategory(FoodCategory category);

    Optional<List<Food>> findFoodByAllergyGroupIsNotIn(List<AllergyGroup> allergies);
}
