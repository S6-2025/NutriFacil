import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterForm } from "../hooks/useRegisterForm";
import type { RegisterRequestDTO } from "../types/RegisterRequestDTO";

const Register: React.FC = () => {
  const { form, handleChange, handleSubmit } = useRegisterForm();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    token ? navigate("/") : null;
  }, [])

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
 
    /* const data = {
      username: form.username,
      fullname: form.fullname,
      email: form.email,
      password: form.password,
    }; */
    const data: RegisterRequestDTO = {
      username: form.username,
      fullname: form.fullname,
      email: form.email,
      password: form.password,
      gender: "",
      age: 0,
      weight: 0,
      height: 0
    }
    try{
      handleSubmit(e, data);
      navigate("/questionary", { state: form });
    }catch (error) {
      alert('Erro ao registrar usuário.');
    }
    
    //localStorage.setItem("register_safe_data", JSON.stringify(safeData));

  }

  return (
    <main className="super-container" id="super-container-form">
      <section className="super-form-register">
        <div className="logo-block" id="logo-block-register">
          <div className="logo">
            <svg className="header__SVG" id="apple-login">
              <use xlinkHref="/icons.svg#apple"></use>
            </svg>
            <p>NutriFacil</p>
          </div>
        </div>

        <form className="form-register" onSubmit={handleNextStep}>
          <div className="camps">
            <label htmlFor="fullname">Nome:</label>
            <input
              value={form.fullname}
              onChange={handleChange}
              type="text"
              id="fullname"
              autoComplete="name"
              name="fullname"
              required
              placeholder="Digite seu nome"
            />
          </div>

          <div className="camps">
            <label htmlFor="username">UserName:</label>
        
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              id="username"
              autoComplete="username"
              name="username"
              required
              placeholder="Digite um username"
            />
          </div>


          <div className="camps">
            <label htmlFor="email">Email:</label>
    
            <input
              value={form.email}
              onChange={handleChange}
              type="email"
              id="email"
              autoComplete="new-email"
              name="email"
              required
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="camps">
            <label htmlFor="password">Senha:</label>
           
            <input
              value={form.password}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              autoComplete="new-password webauthn"
              required
              placeholder="Digite sua senha"
            />
          </div>

    
          <button type="submit">Próxima Etapa</button>
        </form>

        <p className="message-login-register">

          Já tem conta?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
