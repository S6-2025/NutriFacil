package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.Models.Answer;
import com.nutrifacil.app.Models.Question;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionsController {
    private List<Question> questions = List.of(
            new Question(1,"Qual é o objetivo com o plano Nutrifacil?",List.of("Ganhar musculos","Perde peso")),
            new Question(2,"Qual é o tipo de dieta que você gostaria de seguir?",List.of("Vegetariana","Low Carb","Mediterrânea", "Cetogênica")),
            new Question(3,"Quais tipos de proteinas você deseja no seu plano?",List.of("50","60","70")),
            new Question(4,"Qual é o seu peso?",List.of("50","60","70")),
            new Question(5,"Qual é o seu peso?",List.of("50","60","70"))
    );

    private List<Answer> answers = List.of();


    @GetMapping("")
    public ResponseEntity<List<Question>> getAllQuestions(){
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<Object> getNextQuestion(@PathVariable(required = false) int id){

        try{
            Question question = questions.get(id);
            return ResponseEntity.ok(question);
        }catch (IndexOutOfBoundsException e){
            return ResponseEntity.ok("Fim de perguntas");
        }

    }

    @PostMapping("/question/{id}")
    public ResponseEntity<Object> submitAnswer(@PathVariable int questionId, @RequestBody String answer){
        this.answers.add(new Answer(questions.get(questionId),answer));
        return ResponseEntity.ok("Resposta enviada com sucesso");
    }
}
