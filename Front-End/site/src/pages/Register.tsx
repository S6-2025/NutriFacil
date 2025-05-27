import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterForm } from "../hooks/useRegisterForm";

const Register: React.FC = () => {
  const { form, handleChange } = useRegisterForm();
  const navigate = useNavigate();

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
 
    const safeData = {
      username: form.username,
      fullname: form.fullname,
      email: form.email,
    };
    localStorage.setItem("register_safe_data", JSON.stringify(safeData));

  
    navigate("/questionary", { state: form });
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
              autoComplete="new-password webauthn"
              name="password"
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
