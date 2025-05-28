package com.nutrifacil.app.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Question {
    private int id;
    private String question;
    private List<String> options;
}
