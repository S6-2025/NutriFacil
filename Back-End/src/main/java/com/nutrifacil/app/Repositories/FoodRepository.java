package com.nutrifacil.app.Repositories;

import com.nutrifacil.app.Models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
