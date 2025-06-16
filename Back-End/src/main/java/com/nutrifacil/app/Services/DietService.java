package com.nutrifacil.app.Services;


import com.nutrifacil.app.DTO.DietDTO;
import com.nutrifacil.app.ENUM.AllergyGroup;
import com.nutrifacil.app.Models.Diet;
import com.nutrifacil.app.Models.Food;
import com.nutrifacil.app.Repositories.DietRepository;
import com.nutrifacil.app.Repositories.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DietService {
    @Autowired
    private final DietRepository dietRepository;

    @Autowired
    private final FoodRepository foodRepository;

    public List<Food> getAvaiablesFoods(Diet diet) {
        List<Food> avaiableFoods = new ArrayList<>();
        if (diet.getProfile().getAllergies().contains(AllergyGroup.NONE)) {
            avaiableFoods = foodRepository.findAll();
        } else {
            avaiableFoods = foodRepository.findFoodByAllergyGroupIsNotIn(diet.getProfile().getAllergies())
                    .orElseThrow(() -> new RuntimeException("Nenhuma comida disponivel"));
        }

        return avaiableFoods.stream().filter(
                (food) -> food.getDietTypes().contains(diet.getType())
        ).toList();


    }

    public Diet getDietByUsename(String username) {
        return dietRepository.findDietByProfile_User_Username(username).orElseThrow(
                () -> new RuntimeException("Nenhuma dieta encontrada")
        );
    }

    public Diet updateDiet(String username, DietDTO updateData) {
        Diet diet = dietRepository.findDietByProfile_User_Username(username)
                .orElseThrow(() -> new RuntimeException("Nenhuma informação encontrada!!"));

        if (updateData.objective() != null) {
            diet.setObjective(updateData.objective());
        }
        if (updateData.type() != null) {
            diet.setType(updateData.type());
        }
        if (updateData.physicalActivityStatus() != null) {
            diet.setPhysicalActivityStatus(updateData.physicalActivityStatus());
        }

        diet.setWaterConsume();
        diet.setTmb();
        diet.setImc();


        return diet;
    }

}
