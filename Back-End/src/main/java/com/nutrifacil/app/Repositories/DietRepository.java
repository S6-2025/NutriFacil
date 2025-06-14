package com.nutrifacil.app.Repositories;

import com.nutrifacil.app.Models.Diet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DietRepository extends JpaRepository<Diet, UUID> {
    Optional<Diet> findDietByProfile_User_Username(String username);
}
