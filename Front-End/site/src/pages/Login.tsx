
import { Link, useNavigate } from "react-router-dom";
import { useUserLoginForm } from "../hooks/userLoginForm";
import { useState } from "react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

 

  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  } = useUserLoginForm();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      await handleSubmit(event, data);
      navigate("/result");
    } catch (error) {
      console.error("Error during form submission:", error);
      setErrorMessage(errorMessage || "Erro ao fazer login.");
      setShowTooltip(true);
    }
  };

  return (
    <main className="super-container" id="super-container-form">
      <div className="login-textImg">
        <h1 className="h1-login-register">Faça login e começe a ter uma vida mais saudável</h1>
        <svg className="svg-login-register">
          <use xlinkHref="/icons.svg#healthy-options" />
        </svg>
      </div>
      <div className="login-form">
        <section className="super-form">
          <div className="logo-block">
            <div className="logo">
              <svg className="header__SVG" id="apple-login">
                <use xlinkHref="/icons.svg#apple" />
              </svg>
              <p>NutriFacil</p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="camps">
              <label htmlFor="username-login">Username:</label>
              <input
                type="text"
                id="username-login"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="username"
                name="username-login"
                placeholder="Digite seu username"
                
              />
              
            </div>

            <div className="camps  input-wrapper">
              <label htmlFor="password-login">Senha:</label>
              <input
                type="password"
                id="password-login"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                name="password-login"
                placeholder="Digite sua senha"
                className={showTooltip ? "input-error" : ""}
              />
              {showTooltip && (
                <span className="tooltip-error">{errorMessage}</span>
              )}
            </div>

            <button type="submit" className="login-register-button">LogIn</button>
          </form>

          <p className="message-login-register">
            Não tem conta ainda?{" "}
            <Link className="link" to="/register">
              Cadastrar
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
