import React from "react";

const Result: React.FC = () => {
  return (
    <main className="super-container" id="super-container-form">
      <div className="result-container">
        <div className="meal-plan">
          <h2>Plano Alimentar</h2>
          <table className="table-meals">
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
                <td>Maçã 80kcal
                    Banana  90kcal
                    Morango  50kcal
                </td>
                <td>Maçã 80kcal
                    Banana  90kcal
                    Morango  50kcal</td>
                <td>Maçã 80kcal
                    Banana  90kcal
                    Morango  50kcal</td>
              </tr>
              <tr>
                <th>Terça</th>
                <td>Maçã 80kcal
                    Banana  90kcal
                    Morango  50kcal
                     </td>
                <td> Maçã 80kcal
                    Banana  90kcal
                    Morango  50kcal</td>
                <td> Maçã 80kcal
                    Banana  90kcal
                    Morango  50kcal</td>
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
                <td className="border-right" >1000kcal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </main>
  );
};

export default Result;
