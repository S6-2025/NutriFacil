import React from 'react'
import { useLoginToggle } from '../hooks/useLoginToggle';

const LoginRegister: React.FC = () => {
  const { isLogin, toggleForm } = useLoginToggle();
  return (

<main className="super-container">
     
 {isLogin ? (
        <section className="form">
          <h2>Login</h2>
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Entrar</button>
          </form>
          <p>
            Não tem conta ainda?{' '}
            <span  onClick={toggleForm}>
              Cadastrar
            </span>
          </p>
        </section>
      ) : (
        <section className="form">
          <h2>Register</h2>
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />

            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />

            <button type="submit">Registrar</button>
          </form>
          <p>
            Já tem conta?{' '}
            <span onClick={toggleForm}>
              Login
            </span>
          </p>
        </section>
      )}
    
    </main>

  )
}                   

export default LoginRegister