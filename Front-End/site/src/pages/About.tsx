import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <main className="super-container">
      <section className="text-block-about">
        <h1>Sobre nós</h1>

        <blockquote>
          “Que seu remédio seja seu alimento, e que seu alimento seja seu
          remédio.”
          <footer>
            <cite>Hippócrates</cite>
          </footer>
        </blockquote>

        <p>
          Acreditamos que a nutrição é a base de uma vida saudável. Nossa missão
          é oferecer orientações confiáveis, baseadas na ciência, para ajudar as
          pessoas a fazerem escolhas conscientes sobre o que comem.
          <br />
          Valorizamos a tradição, o equilíbrio e a consistência — princípios que
          sempre fizeram parte de uma boa alimentação.
        </p>
      
      </section>

      <section className="image-block-about">
        <img src="/healthy_options.png" alt="Frutas" />
      </section>

      {/*  waves aqui */}
      <section className="section-divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="#DBFFD0"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,224C672,224,768,192,864,176C960,160,1056,160,1152,160C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/*  waves acaba aqui */}

      <section className="text-block-about" id="colored">
        <p>
          Nosso compromisso é tornar a nutrição algo simples e acessível. Seja
          para quem deseja emagrecer, melhorar a alimentação ou apenas entender
          melhor os alimentos, oferecemos ferramentas, conhecimento e suporte ao
          longo da jornada.
          <br />
          <br />
          Com respeito à sabedoria do passado e foco em disciplina e clareza,
          estamos aqui para ajudar você a construir hábitos duradouros — uma
          refeição de cada vez.
        </p>
          <div className="button-wrapper">
            <Link to="/">  <button type="button">Voltar para a home</button></Link>
         
        </div>
      </section>
      
    </main>
  );
};

export default About;
