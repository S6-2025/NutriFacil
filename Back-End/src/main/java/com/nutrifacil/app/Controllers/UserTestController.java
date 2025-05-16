package com.nutrifacil.app.Controllers;

import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Services.UserTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserTestController {

    @Autowired //PODE SER UTILIZADO NO CONSTRUTOR TBM COMO PARAMETRO MAS ESSA É MAIS FACIL
    private UserTestService userService;
}
