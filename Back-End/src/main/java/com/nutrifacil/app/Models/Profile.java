package com.nutrifacil.app.Models;

import com.nutrifacil.app.Enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import org.springframework.format.annotation.DateTimeFormat;


import java.time.LocalDate;
import java.util.List;
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

    @Column(nullable = false, columnDefinition = "DATE")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthdate;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private Double height;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "profile_allergies", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "allergies", nullable = false)
    private List<String> allergies;

    @Formula("weight / (height * height)")
    private Double imc;

    @Formula(value = "CASE gender " +
            "WHEN 'MALE' THEN (66.5 + (13.75 * weight) + (5.003 * height * 100) - (6.755 * EXTRACT(YEAR FROM AGE(birthdate)))) " +
            "WHEN 'FEMALE' THEN (655.1 + (9.563 * weight) + (1.850 * height * 100) - (4.676 * EXTRACT(YEAR FROM AGE(birthdate)))) END")
    private Double tmb;

    @OneToOne(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private Diet diet;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
