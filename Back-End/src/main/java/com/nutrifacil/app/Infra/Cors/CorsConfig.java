package com.nutrifacil.app.Infra.Cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
<<<<<<< HEAD
<<<<<<< HEAD
=======
                .allowedOrigins("http://localhost:5173/")
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .allowedHeaders("*");
=======
>>>>>>> 504d1b975a1a208df8a115964229f9da43f95d88
                .allowedOrigins("http://localhost:4200", "http://127.0.0.1:5500")
                .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
<<<<<<< HEAD
=======
                .allowedOrigins("http://localhost:5173/")
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                .allowedHeaders("*");
>>>>>>> 29c64fb (tentativa de fazer login)
=======
>>>>>>> 4faf7bf62b657343ebc5bae705f2cc12f14bf74d
>>>>>>> 504d1b975a1a208df8a115964229f9da43f95d88
    }
}