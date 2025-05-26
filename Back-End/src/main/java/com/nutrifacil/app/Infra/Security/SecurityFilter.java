package com.nutrifacil.app.Infra.Security;

import com.nutrifacil.app.Models.User;
import com.nutrifacil.app.Repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter { //? Esse filtro vai rodar a cada requisição da API

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;
    //? Função para pegar e validar o token do user. Caso esteja correto adiciona ao contexto do Spring Security
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        var login = tokenService.validateToken(token);

        if(login != null){
            User user = userRepository.findByUsername(login).orElseThrow(() -> new RuntimeException("Usuário não encontrado")); //? Caso não encontre o usuário
            var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")); //? Role generica pq n trabalhamos com outras!
            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
    private String recoverToken(HttpServletRequest request){ //! Alterar caso tenha mudança onde o token é enviado
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
