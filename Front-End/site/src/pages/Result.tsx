import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

import { useEffect, useState } from "react";
import { IgrExpansionPanel, IgrExpansionPanelModule } from "igniteui-react";
import "igniteui-webcomponents/themes/light/bootstrap.css";

IgrExpansionPanelModule.register();

type UserInfo = {
  fullname: string;
};

type DietInfo = {
  tmb: number;
  imc: number;
  
  objective: string;
  type: string;
  caloriesConsume: number;
  waterConsume: number;
  calorieDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    total: number;
  };
};
const dietTypeLabels: Record<string, string> = {
  VEGETARIANA: "Vegetariana",
  LOW_CARB: "Low Carb",
  MEDITERRANEA: "Mediterrânea",
  CETOGENICA: "Cetogênica",
};

const dietObjectiveLabels: Record<string, string> = {
  EMAGRECIMENTO: "Emagrecimento",
  HIPERTROFIA: "Hipertrofia",
};

type Food = {
  name: string;
  category: string; // e.g. "protein", "vegetable"
  caloriesPer100grams: number;
  caloriesPer80grams: number;
  caloriesPer50grams: number;
};

const Result: React.FC = () => {
  useEffect(() => {
    localStorage.removeItem("questionary_done");
  }, []);

  const [user, setUser] = useState<UserInfo | null>(null);
  const [diet, setDiet] = useState<DietInfo | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  function getUsernameFromToken(token: string): string | null {
    try {
      const payload = jwtDecode(token)
      return payload.sub || null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("Token não encontrado.");
        setLoading(false);
        return;
      }

      const username = getUsernameFromToken(token);

      if (!username) {
        console.error("Token inválido. Não foi possível extrair o username.");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const [userRes, dietRes, foodsRes] = await Promise.all([
          axios.get(`http://localhost:3030/user/${username}`, { headers }),
          axios.get(`http://localhost:3030/diet/${username}`, { headers }),
          axios.get(`http://localhost:3030/diet/${username}/foods/available`, {
            headers,
          }),
        ]);

        console.log("✅ Dados recebidos:");
        console.log("User:", userRes.data);
        console.log("Diet:", dietRes.data);
        console.log("Foods:", foodsRes.data);

        setUser(userRes.data);
        setDiet(dietRes.data);
        setFoods(foodsRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    localStorage.removeItem("questionary_done");
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mini-container">
      <div className="user-container">
        <div className="square-profile">
          <svg className="header__SVG">
            <use xlinkHref="/icons.svg#orange" />
          </svg>

          <div className="user-infos">
            <h2 className="name-h2">{user?.fullname ?? "No name"}</h2>

            <div className="objectives">
              <div>
                <svg className="header__SVG">
                  <use xlinkHref="/icons.svg#target" />
                </svg>
               <span className="span-label"> {diet?.objective
                  ? dietObjectiveLabels[diet.objective] || diet.objective
                  : "Objetivo"}</span>
              </div>

              <div>
                <svg className="header__SVG">
                  <use xlinkHref="/icons.svg#diet" />
                </svg>
                <span className="span-label">
                  {diet?.type
                    ? dietTypeLabels[diet.type] || diet.type
                    : "Dieta"}
                </span>
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
            d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,80C1120,75,1280,85,1360,90.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </section>

      <div className="results-container">
        <div className="tmb">
          <h2>Taxa Metabólica Basal</h2>
          <h3 className="h3-with-blob">
            {" "}
            {typeof diet?.tmb === "number" ? diet.tmb.toFixed(0) : "-"}
          </h3>
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
          <h2>Seu IMC</h2>
          <h3 className="h3-with-blob">
            {" "}
            {typeof diet?.imc === "number" ? diet.imc.toFixed(1) : "-"}
          </h3>

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
          <h3 className="h3-with-blob" id="water">
            {typeof diet?.waterConsume === "number"
              ? `${diet.waterConsume.toFixed(1)} L`
              : "-"}
          </h3>
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
              <th>Janta</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Todos os Dias</th>
{/*               <td>{diet?.calorieDistribution?.breakfast ?? "-"}</td>
              <td>{diet?.calorieDistribution?.lunch ?? "-"}</td>
              <td>{diet?.calorieDistribution?.dinner ?? "-"}</td> */}
              <td>{typeof diet?.caloriesConsume === "number" ? (diet.caloriesConsume * 0.20).toFixed(0) : "-"}</td>
              <td>{typeof diet?.caloriesConsume === "number" ? (diet.caloriesConsume * 0.4).toFixed(0) : "-"}</td>
              <td>{typeof diet?.caloriesConsume === "number" ? (diet.caloriesConsume * 0.4).toFixed(0) : "-"}</td>
              <th>{diet?.caloriesConsume ?? "-"}</th>
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
                {foods
                  .filter((f) => f.category === "PROTEIN")
                  .map((food, idx) => (
                    <tr key={idx}>
                      <th></th>
                      <td>{food.name}</td>
                      <td>{Math.round(food.caloriesPer100grams)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.8)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.5)} kcal</td>
{/*                       <td>{food.caloriesPer80grams} kcal</td>
                      <td>{food.caloriesPer50g} kcal</td> */}
                    </tr>
                  ))}
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
                {foods
                  .filter((f) => f.category === "VEGETABLES")
                  .map((food, idx) => (
                    <tr key={idx}>
                      <th></th>
                      <td>{food.name}</td>
                      <td>{Math.round(food.caloriesPer100grams)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.8)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.5)} kcal</td>
                    </tr>
                  ))}
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
                {foods
                  .filter((f) => f.category === "green")
                  .map((food, idx) => (
                    <tr key={idx}>
                      <th></th>
                      <td>{food.name}</td>
                      <td>{Math.round(food.caloriesPer100grams)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.8)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.5)} kcal</td>
                    </tr>
                  ))}
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
                {foods
                  .filter((f) => f.category === "CARBHYDRATES")
                  .map((food, idx) => (
                    <tr key={idx}>
                      <th></th>
                      <td>{food.name}</td>
                      <td>{Math.round(food.caloriesPer100grams)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.8)} kcal</td>
                      <td>{Math.round(food.caloriesPer100grams * 0.5)} kcal</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </span>
        </IgrExpansionPanel>
        <br />
      </div>
    </div>
  );
};

export default Result;
