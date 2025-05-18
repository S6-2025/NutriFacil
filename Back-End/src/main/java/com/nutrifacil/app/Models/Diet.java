package com.nutrifacil.app.Models;

import com.nutrifacil.app.Enums.DietObjective;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

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


}
