import React from "react";
import { Link } from "react-router-dom";

 
const Register: React.FC = () => {


  
  return (
    <main className="super-container" id="super-container-form">
      <section className="super-form-register">
        <div className="logo-block " id='logo-block-register'>
          <div className="logo">
            <svg className="header__SVG" id="apple-login">
              {" "}
              <use xlinkHref="/icons.svg#apple"></use>
            </svg>
            <p>NutriFacil</p>
          </div>
        </div>

        <form className="form-register">
          <div className="camps">
            <label className="teste-label" htmlFor="name-register">
              Nome:
            </label>
            <input
              type="text"
              id="name-register"
              autoComplete="name"
              name="name-register"
              required
              placeholder="Digite seu nome"
            />
          </div>

          <div className="camps">
            <label htmlFor="email-register">Email:</label>
            <input
              type="email"
              id="email-register"
              autoComplete="new-email"
              name="email-register"
              required
              placeholder="Digite seu e-mail"
            />
          </div>

          
          <div className="camps">
            <label htmlFor="telephone-register">Telefone:</label>
            <input
              type="text"
              id="telephone-register"
              autoComplete="new-email"
              name="telephone-register"
              required
              placeholder="Digite seu telefone"
            />
          </div>

          <div className="camps">
            <label htmlFor="password-register">Senha:</label>
            <input
              type="password"
              id="password-register"
              autoComplete="new-password"
              name="password-register"
              required
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p className="message-login-register">
          Já tem conta? <Link  className='link' to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
