import React from "react";
import { Link } from "react-router-dom";

const LegalPrivacy: React.FC = () => {
  return (
    <main className="super-container">
      <section className="text-block-about" id="term-privacy-text-block">
        <h1>Política de Privacidade</h1>

        <blockquote>
          “Respeitar a saúde começa por proteger os dados.”
          <footer>
            <cite>Equipe NutriFácil</cite>
          </footer>
        </blockquote>

        <p>
          O NutriFácil respeita a sua privacidade e se compromete a proteger os
          dados pessoais fornecidos pelos usuários. As informações solicitadas
          durante o cadastro e o uso da plataforma são utilizadas exclusivamente
          para fins de funcionamento do serviço, como geração de planos
          alimentares e análise de perfil nutricional.
          <br />
          <br />
          Nenhum dado pessoal será vendido, alugado ou compartilhado com
          terceiros sem o seu consentimento, exceto quando exigido por lei ou
          ordem judicial.
          <br />
          <br />
          Os dados são armazenados com segurança e utilizados de forma ética,
          seguindo princípios de minimização, necessidade e finalidade. Você
          pode solicitar a exclusão ou correção de seus dados a qualquer
          momento.
          <br />
          <br />
          Utilizamos cookies e tecnologias similares para melhorar a experiência
          do usuário e analisar o uso da plataforma. Ao continuar utilizando o
          NutriFácil, você concorda com essas práticas.
          <br />
          <br />
          Esta política pode ser atualizada periodicamente. Recomendamos que
          você a revise com regularidade para se manter informado sobre como
          seus dados são tratados.
        </p>
      </section>
    </main>
  );
};

export default LegalPrivacy;
//  O css ta dentro do about.css
