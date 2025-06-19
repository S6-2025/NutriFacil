import React from "react";
import { Link } from "react-router-dom";

const Term: React.FC = () => {
  return (
    <main className="super-container">
      <section className="text-block-about" id="term-privacy-text-block">
        <h1>Termos de Serviço</h1>

        <blockquote>
          “Compromisso com a saúde exige responsabilidade com a informação.”
          <footer>
            <cite>Equipe NutriFácil</cite>
          </footer>
        </blockquote>

        <p>
          Ao utilizar o NutriFácil, você concorda com os termos estabelecidos
          neste documento. Nosso serviço oferece orientações nutricionais com
          base em dados fornecidos por você, respeitando os princípios da boa
          ciência e da ética digital.
          <br />
          <br />
          Reforçamos que o conteúdo disponibilizado não substitui o
          acompanhamento profissional individualizado. O NutriFácil é uma
          ferramenta de apoio, construída com responsabilidade, respeito ao
          usuário e compromisso com a clareza.
          <br />
          <br />
          Ao continuar utilizando nossos serviços, você declara que compreende e
          aceita as condições aqui descritas.
        </p>
      </section>

    </main>
  );
};

export default Term;
