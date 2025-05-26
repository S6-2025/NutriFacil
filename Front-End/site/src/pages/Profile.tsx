import React from "react";
// import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  return (
    <main className="super-container" id="super-container-form">
      <div className="container-profile">
        <h1>Editar perfil</h1>

        <section className="personal-info">
          <h2>Informações pessoais</h2>

          <form className="form-personal">
            <div className="personal-camps">
              <label htmlFor="name-info">
                Nome:
              </label>
              <input
                type="text"
                id="name-info"
                autoComplete="name"
                name="name-info"
                required
                placeholder="###"
                disabled
              />
            </div>

            <div className="personal-camps">
              <label htmlFor="genre-info">Sexo:</label>
              <input
                type="text"
                id="genre-info"
                name="genre-info"
                required
                placeholder="###"
                disabled
              />
            </div>


            <div className="personal-camps">
              <label htmlFor="birth-info">Data de nascimento:</label>
              <input
                type="date"
                id="birth-info"
                autoComplete="bday-day webauthn"
                name="birth-info"
                required
                placeholder="##/##/####"
                disabled
              />
            </div>


            
            <div className="personal-camps">
              <label htmlFor="telephone-info">Telefone:</label>
              <input
                type="text"
                id="telephone-info"
                autoComplete="mobile tel-extension"
                name="telephone-info"
                required
                placeholder="###"
                disabled
              />
            </div>
          </form>
        </section>

        <section className="login-info">
          <h2>Informações de Login</h2>
          <form className="form-info">
            <div className="info-camps">
              <label htmlFor="email-info">Email:</label>
              <input
                type="email"
                id="email-info"
                autoComplete="email"
                name="email-info"
                placeholder="####@####"
                disabled
              />
            </div>

            <div className="info-camps">
              <label htmlFor="password-info">Senha:</label>
              <input
                type="password"
                id="password-info"
                autoComplete="current-password"
                name="password-info"
                placeholder="####"
                disabled
              />
            </div>
          </form>
        </section>


        <section>
          <button> teste</button>
        </section>
      </div>


    </main>
  );
};

export default Profile;
