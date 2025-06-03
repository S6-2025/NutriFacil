import React from "react";
import { IgrExpansionPanel, IgrExpansionPanelModule } from "igniteui-react";
import "igniteui-webcomponents/themes/light/bootstrap.css";

IgrExpansionPanelModule.register();

const Result: React.FC = () => {
  return (
    <div className="mini-container">
      <div className="user-container">

        <div className="square-profile">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#orange" />
          </svg>

          <div className="user-infos">
            <h2>Gabrielle Soares Teixeira</h2>

            <div className="objectives">

              <div>
                <svg className="header__SVG">
                  <use xlinkHref="/icons.svg#target" />
                </svg>
                <span> Perder Peso</span>
              </div>

              <div>
                <svg className="header__SVG">
                  <use xlinkHref="/icons.svg#diet" />
                </svg>
                <span> Mediterranea</span>
              </div>

            </div>

          </div>
        </div>
      </div>

      <section className="section-divider">
        <svg
          id="wave-profile"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#008053"
            fillOpacity="1"
            d="M0,0L60,5.3C120,11,240,21,360,26.7C480,32,600,32,720,42.7C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </section>

      <div className="results-container">

        <div className="tmb">
          <h2>Taxa Metábolica Basal</h2>
          <h3 className="h3-with-blob">43.9</h3>
          <IgrExpansionPanel>
            <h1 slot="title">O que é TMB?</h1>
            <h3 slot="subtitle"></h3>
            <span>
              The Golden Retriever is a medium-large gun dog that retrieves shot
              waterfowl, such as ducks and upland game birds, during hunting and
              shooting parties.[3] The name retriever refers to the breeds
              ability to retrieve shot game undamaged due to their soft mouth.
              Golden retrievers have an instinctive love of water, and are easy
              to train to basic or advanced obedience standards.
            </span>
          </IgrExpansionPanel>
        </div>

        <div className="imc">
          <h2> Seu IMC</h2>
          <h3 className="h3-with-blob">43.9</h3>

          <IgrExpansionPanel>
            <h1 slot="title">O que é IMC?</h1>
            <h3 slot="subtitle"></h3>
            <span>
              The Golden Retriever is a medium-large gun dog that retrieves shot
              waterfowl, such as ducks and upland game birds, during hunting and
              shooting parties.[3] The name retriever refers to the breeds
              ability to retrieve shot game undamaged due to their soft mouth.
              Golden retrievers have an instinctive love of water, and are easy
              to train to basic or advanced obedience standards.
            </span>
          </IgrExpansionPanel>
        </div>


          <div className="tmb">
          <h2>Consumo diário de água</h2>
          <h3 className="h3-with-blob" id="water">2.5L</h3>
         
        </div>

      </div>

      <div className="kcal-container">
        <h2>Sugestão de distribuição de calorias</h2>

        <table className="table-kcals">
          <thead>
            <tr>
              <th> </th>
              <th>Café da Manhã</th>
              <th>Almoço</th>
              <th>janta</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Todos os Dias</th>
              <td>300 kcal</td>
              <td>300 kcal</td>
              <td>300 kcal</td>
              <th>1000 kcal</th>
            </tr>
          </tbody>
        </table>
        <br />
      </div>

      <div className="meals-container">
        <h2> Sugestão para alimentos</h2>
        <IgrExpansionPanel>
          <h1 slot="title">Proteínas</h1>
          <h3 slot="subtitle"></h3>
          <span>
            <table className="table-kcals">
              <thead>
                <tr>
                  <th> </th>
                  <th>Alimento </th>
                  <th>100g</th>
                  <th>80g</th>
                  <th>50g</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Calorias</th>
                  <td>Banana</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Aveia</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Iorgute</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Maçã</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
              </tbody>
            </table>
          </span>
        </IgrExpansionPanel>
          <br />
        <IgrExpansionPanel>
          <h1 slot="title">Legumes</h1>
          <h3 slot="subtitle"></h3>
          <span>
            <table className="table-kcals">
              <thead>
                <tr>
                  <th> </th>
                  <th>Alimento </th>
                  <th>100g</th>
                  <th>80g</th>
                  <th>50g</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Calorias</th>
                  <td>Banana</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                <tr>
                  <th>Calorias</th>
                  <td>Aveia</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Iorgute</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Maçã</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
              </tbody>
            </table>
          </span>
        </IgrExpansionPanel>
          <br />
        <IgrExpansionPanel>
          <h1 slot="title">Verduras</h1>
          <h3 slot="subtitle"></h3>
          <span>
            <table className="table-kcals">
              <thead>
                <tr>
                  <th> </th>
                  <th>Alimento </th>
                  <th>100g</th>
                  <th>80g</th>
                  <th>50g</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Calorias</th>
                  <td>Banana</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Aveia</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Iorgute</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Maçã</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
              </tbody>
            </table>
          </span>
        </IgrExpansionPanel>
        <br />
        <IgrExpansionPanel>
          <h1 slot="title">Carboidratos</h1>
          <h3 slot="subtitle"></h3>
          <span>
            <table className="table-kcals">
              <thead>
                <tr>
                  <th> </th>
                  <th>Alimento </th>
                  <th>100g</th>
                  <th>80g</th>
                  <th>50g</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Calorias</th>
                  <td>Banana</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Aveia</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Iorgute</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
                 <tr>
                  <th>Calorias</th>
                  <td>Maçã</td>
                  <td>300 kcal</td>
                  <td>300 kcal</td>
                  <td>1000 kcal</td>
                </tr>
              </tbody>
            </table>
          </span>
        </IgrExpansionPanel>
        <br />
      </div>

      {/* <div className="data-container">
        <canvas id="myChart"></canvas>
      </div> */}
    </div>

    
  );
};

export default Result;
