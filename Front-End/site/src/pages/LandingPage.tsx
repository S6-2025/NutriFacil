import React from 'react'
import './LandingPage.css' // depois você cria esse arquivo CSS e adapta o estilo

const LandingPage: React.FC = () => {
  return (
    <main>
      <section className="text-button-block">
        <h1>Customize your diets!</h1>
        <span role="img" aria-label="apple">🍎</span> Discover what works for you in a practical and quick way.
        <p>
          If you want to improve your eating habits but don't know where to start, answer our quick questionnaire and receive
          personalized recommendations based on your profile, goals, and food preferences.
          <br /><br />
          Our goal is to make nutrition simple, accessible, and adapted to your routine.
          <br />
          Shall we start?
        </p>
        <div className="button-wrapper">
          <button type="button">Start now!</button>
        </div>
      </section>

      <section className="image-block" id="image-block-1">
       <img src="/frutas_semfundo.JPG" alt="Fruits" id="Fruits1" />
      </section>

      <section className="section-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" aria-hidden="true" focusable="false">
          <path
            fill="#DBFFD0"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,224C672,224,768,192,864,176C960,160,1056,160,1152,160C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section className="text-button-block" id="block2">
        <h1>Freedom of choice!</h1>
        <p>
          Choose which diet to follow, based on the foods you like the most.
          <br />
          We use ketogenic, vegetarian, Mediterranean, and low-carb diet routines as the basis.
        </p>
        <div className="button-wrapper">
          <button type="button">Build my diet</button>
        </div>
      </section>

      <section className="image-block">
        <img src="/healthy_options.png" alt="Healthy Options" id="healthy_options" />
      </section>
    </main>
  )
}

export default LandingPage
