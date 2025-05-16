package com.nutrifacil.app.Repositories;

import com.nutrifacil.app.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
