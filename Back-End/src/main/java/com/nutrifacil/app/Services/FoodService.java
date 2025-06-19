package com.nutrifacil.app.Services;

import com.nutrifacil.app.Models.Food;
import com.nutrifacil.app.Repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodService {

    @Autowired
    private FoodRepository repository;

    public void register(Food food) {
        if (repository.findFoodByName(food.getName()).isEmpty()) {
            repository.save(food);
        }
    }

}
