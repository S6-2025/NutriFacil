import React, {useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useRegisterForm } from "../hooks/useRegisterForm";
import type { RegisterRequestDTO } from "../types/RegisterRequestDTO";

const Register: React.FC = () => {
  const { form, handleChange, handleSubmit } = useRegisterForm();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

useEffect(() => {
  const questionaryDone = localStorage.getItem("questionary_done");

  if (!questionaryDone) {
    if (!state || !state.diet || !state.gender || !state.birthdate) {
      navigate("/questionary");
    }
  }
}, [navigate, state]);


async function handleNextStep(e: React.FormEvent) {
  e.preventDefault();

  const data: RegisterRequestDTO = {
    username: form.username,
    fullname: form.fullname,
    email: form.email,
    password: form.password,
    gender: state.gender.toUpperCase(),
    birthdate: state.birthdate,
    weight: state.weight,
    height: state.height,
    allergies: state.diet.allergies || [''],
    diet: {
      objective: state.diet.objective,
      type: state.diet.type,
      physicalActivityStatus: state.diet.physicalActivityStatus,
    }
  };

  try {
    await handleSubmit(e, data); // Certifique-se que handleSubmit retorna uma Promise
  const questionaryDone = localStorage.getItem("questionary_done");

if (questionaryDone) {
  navigate("/result", {
    state: {
      fullname: form.fullname,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      objective: data.diet.objective
    }
  });
} else {
  navigate("/questionary", { state: data });
}

  } catch (error) {
    alert('Erro ao registrar usuário.');
  }
}


  return (
    <main className="super-container" id="super-container-form">
      
      <div className="login-textImg">
        <h1 className="h1-login-register">Faça login e começe a ter uma vida mais saudável</h1>
        <svg className="svg-login-register "><use xlinkHref="/icons.svg#healthy-options"/></svg>
      </div>
      <div className="login-form">
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
            <button type="submit" className="login-register-button ">Próxima Etapa</button>
          </form>
          <p className="message-login-register">
            Já tem conta?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Register;
