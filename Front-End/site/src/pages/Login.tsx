import React from 'react'
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <main className="super-container" id="super-container-form">
  
        <section className="super-form">

          <div className="logo-block" >
            <div className="logo">
              <svg className="header__SVG" id="apple-login">
                 <use xlinkHref="/icons.svg#apple"></use>
                 </svg>
              <p>NutriFacil</p>
            </div>
          </div>

          <form>

            <div className="camps">
              <label htmlFor="email-login">Email:</label>
              <input type="email" id="email-login" autoComplete="username" name="email-login"   placeholder='Digite seu e-mail'/>
            </div>

            <div className="camps">
              <label htmlFor="password-login">Senha:</label>
              <input type="password" id="password-login" autoComplete="current-password" name="password-login"  placeholder='Digite sua senha' />
            </div>

            <button type="submit">LogIn</button>
          </form>

          <p className="message-login-register">
            Não tem conta ainda? <Link className='link' to="/register">Cadastrar</Link>
          </p>
        </section>
     
    </main>
  );
}                   

export default Login