package com.nutrifacil.app.Models;

import com.nutrifacil.app.Enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import java.util.UUID;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String fullname;

    @Column(nullable = false, length = 255)
    @Email
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private Double height;

    @Formula("weight / (height * height)")
    private Double imc;

    @Formula(value= "CASE gender " +
            "WHEN 'MALE' THEN (66.5 + (13.75 * weight) + (5.003 * height * 100) - (6.755 * age)) " +
            "WHEN 'FEMALE' THEN (655.1 + (9.563 * weight) + (1.850 * height * 100) - (4.676 * age)) END")
    private Double tmb;

    @OneToOne(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private Diet diet;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


}
