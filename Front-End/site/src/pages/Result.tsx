import React from "react";

const Result: React.FC = () => {
  return (
    <div className="mini-container">

      <div className="user-container">
        <div className="square-profile">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#orange" />
          </svg>

          <div className="user-infos">
            <p>Gabrielle Soares Tei</p>
            <p>
              Objetivo:
              <span> Perder Peso</span>
            </p>
            <p>
              Dieta: <span> Mediterranea</span>
            </p>
          </div>
        </div>
   
      
      </div>
      <section className="section-divider">
        <svg id="wave-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00b475" fill-opacity="1" d="M0,0L60,5.3C120,11,240,21,360,26.7C480,32,600,32,720,42.7C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
      </section>
      <div className="results-container">
        <div className="tmb">
          <h2>Sua Taxa Metábolica Basal</h2>
          <h3 className="h3-with-blob">43.9</h3>
       <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia veritatis expedita ea mollitia suscipit? Corporis dolores molestiae praesentium ex, magnam ratione. Maiores possimus molestiae ratione. Consequatur velit ducimus facilis magnam.</p>
        </div>

        <div className="imc">
          <h2> Seu IMC</h2>
          <h3 className="h3-with-blob">43.9</h3>
        
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet iure hic in aperiam quam necessitatibus aut sunt voluptatem provident nostrum non, iusto obcaecati expedita ipsa cum asperiores error, perspiciatis quisquam?</p>
        </div>
      </div>

      <div className="kcal-container">
        <h2>Plano Alimentar</h2>
        <table className="table-kcals">
          <thead>
            <tr>
              <th> </th>
              <th>Café da Manhã</th>
              <th>Almoço</th>
              <th>janta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Segunda</th>
              <td> 300kcal</td>
              <td>300kcal</td>
              <td>300kcal</td>
            </tr>
            <tr>
              <th>Terça</th>
              <td>Maçã 80kcal Banana 90kcal Morango 50kcal</td>
              <td> Maçã 80kcal Banana 90kcal Morango 50kcal</td>
              <td> Maçã 80kcal Banana 90kcal Morango 50kcal</td>
            </tr>
            <tr>
              <th>Quarta</th>
              <td>Sopa</td>
              <td>Omelete</td>
              <td>Frango</td>
            </tr>
            <tr>
              <th>Quinta</th>
              <td>Sopa</td>
              <td>Omelete</td>
              <td>Frango</td>
            </tr>
            <tr>
              <th>Sexta</th>
              <td>Sopa</td>
              <td>Omelete</td>
              <td>Frango</td>
            </tr>
            <tr>
              <th>Sábado</th>
              <td>Sopa</td>
              <td>Omelete</td>
              <td>Frango</td>
            </tr>
            <tr>
              <th>Domingo</th>
              <td>Sopa</td>
              <td>Omelete</td>
              <td>Frango</td>
            </tr>
            <tr>
              <th className="border-left">Total Kcal</th>
              <td>1000kcal</td>
              <td>1000kcal</td>
              <td className="border-right">1000kcal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="meals-container">
        <h2> Sugestão para alimentos</h2>
        <h3>Café da manhã</h3>
        <p>
          {" "}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
          officia velit numquam quasi aliquid voluptas ipsum esse non vitae
          blanditiis, possimus cumque, dolore suscipit ratione! Tempora, in.
          Eum, perferendis vero.
        </p>
      </div>

      <div className="data-container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Result;
