import React , {useEffect} from 'react'
import { Link } from "react-router-dom";
import { useUserLoginForm } from '../hooks/userLoginForm';

import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    token ? navigate("/") : null;
  }, [])
  const {username, password, handleUsernameChange, handlePasswordChange, handleSubmit} = useUserLoginForm();
  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    var data = {
      username: username,
      password: password
    }
    console.log("Form submitted with data:", data);
    try{
      handleSubmit(event, data);
      navigate("/");
    }catch (error) {
      console.error("Error during form submission:", error);
      alert("Erro ao fazer login. Por favor, tente novamente.");
    }
    
  }

  const handleUsernameFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleUsernameChange(event);
  }
  const handlePasswordFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); 
    handlePasswordChange(event);
  }


  

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

          <form onSubmit={handleFormSubmit}>

            <div className="camps">
              <label htmlFor="email-login">Email:</label>
              <input type="text" id="email-login" onChange={handleUsernameChange} autoComplete="username" name="email-login"   placeholder='Digite seu e-mail'/>
            </div>

            <div className="camps">
              <label htmlFor="password-login">Senha:</label>
              <input type="password" id="password-login" onChange={handlePasswordChange} autoComplete="current-password" name="password-login"  placeholder='Digite sua senha' />
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