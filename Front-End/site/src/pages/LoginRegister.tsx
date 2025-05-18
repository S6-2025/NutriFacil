import React from 'react'
import { useLoginToggle } from '../hooks/useLoginToggle';
import "../css/LoginRegister.css"
const LoginRegister: React.FC = () => {
  const { isLogin, toggleForm } = useLoginToggle();
  return (
    <main className="super-container" id="super-container-form">
      {isLogin ? (
        <section className="super-form">

          <div className="logo-block">
            <div className="logo">
              <svg className="header__SVG" id="apple-login">
                 <use xlinkHref="/icons.svg#apple"></use>
                 </svg>
              <p>NutriFacil</p>
            </div>
          </div>

          <form>

            <div className="camps">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email"   placeholder='Digite seu e-mail'/>
            </div>

            <div className="camps">
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password"  placeholder='Digite sua senha' />
            </div>

            <button type="submit">LogIn</button>
          </form>

          <p className="message-login-register">
            Não tem conta ainda? <span onClick={toggleForm}>Cadastrar</span>
          </p>
        </section>
      ) : (
       <section className="super-form">

          <div className="logo-block">
            <div className="logo">
              <svg className="header__SVG" id="apple-login"> <use xlinkHref="/icons.svg#apple"></use></svg>
              <p>NutriFacil</p>
            </div>
          </div>

          <form>

            <div className="camps">
              <label className='teste-label' htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" required  placeholder='Digite seu nome'/>
            </div>

            <div className="camps">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required  placeholder='Digite seu e-mail'/>
            </div>

            <div className="camps">
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" required placeholder='Digite sua senha'/>
            </div>

            <button type="submit">Entrar</button>
          </form>

          <p className="message-login-register">
            Já tem conta? <span onClick={toggleForm}>Login</span>
          </p>
        </section>
      )}
    </main>
  );
}                   

export default LoginRegister