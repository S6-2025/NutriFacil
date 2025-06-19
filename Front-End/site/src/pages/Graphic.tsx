import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import DropWater from "../components/DropWater"; // ajuste o caminho conforme a sua estrutura
import { jwtDecode } from "jwt-decode";
import type {} from "@mui/x-charts/themeAugmentation";
import ModalForms from "../components/ModalForms";
import { BarChart } from "@mui/x-charts/BarChart";

const MAX_CAPACITY = 2500;

const Graphic: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState(0);
  const [waterGoal, setWaterGoal] = useState(MAX_CAPACITY);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState(1200);
/*   const [foodInput, setFoodInput] = useState(""); */
  const [monthTrack, setMonthTrack] = useState<any>(); // Ajuste o tipo conforme necessário

  const [modalEstaAberto, setModalEstaAberto] = useState(false);

  const handleFoodRegistration = (formsData: any) => {
    console.log("Dados do registro de comida:", formsData);
    const data = {
      username:
        getUsernameFromToken(sessionStorage.getItem("token") || "") || "",
      foodName: formsData.food,
      amountConsumed: formsData.amount,
      mealType: formsData.mealType,
      consumedAt: new Date().toISOString(),
    };
    axios.post("http://localhost:3030/tracker/meal_entry", data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    setModalEstaAberto(false);
  };

  function getUsernameFromToken(token: string): string | null {
    try {
      const payload = jwtDecode(token);
      return payload.sub || null;
    } catch {
      return null;
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const username = getUsernameFromToken(token);

        const dailyTrackRes = (
          await axios.get(`http://localhost:3030/tracker/daily`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              username: username,
              date: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
            },
          })
        ).data;

        const monthTrackRes = (
          await axios.get(`http://localhost:3030/tracker/month`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              username: username,
            },
          })
        ).data;

        console.log("Dados recebidos:", dailyTrackRes);
        console.log("Dados recebidos:", monthTrackRes);
        setMonthTrack(monthTrackRes);
        setWaterAmount(dailyTrackRes.waterTracker.waterConsumed * 1000);
        setWaterGoal(
          dailyTrackRes.waterTracker.waterGoal * 1000 || MAX_CAPACITY
        );
        setCaloriesTotal(dailyTrackRes.mealTracker.caloriesGoal);
        setCaloriesConsumed(dailyTrackRes.mealTracker.caloriesConsumed);
        // Se o total de calorias também vier da API, descomente:
        // setCaloriesTotal(res.data.caloriesTarget);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      }
    };
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    // Se não houver dados, retorna arrays vazios
    if (!monthTrack || monthTrack.length === 0) {
      return { xAxisDataMeal: [], seriesDataMeal: [], xAxisDataWater: [], seriesDataWater: [] };
    }
    console.log("Dados do mês:", monthTrack);

    // 1. Agrega os dados: cria um mapa para somar as calorias por dia
    const dailyCaloriesMeal = new Map<number, number>();
    const dailyAmountWater = new Map<number, number>();

    monthTrack.mealTracker.forEach((entry: any) => {
      const date = new Date(entry.consumedAt);
      const day = date.getDate(); // Pega o dia do mês (1-31)

      const currentCalories = dailyCaloriesMeal.get(day) || 0;
      dailyCaloriesMeal.set(day, currentCalories + entry.caloriesConsumed);
    });
    monthTrack.waterTracker.forEach((entry: any) => {
      const date = new Date(entry.consumedAt);  
      const day = date.getDate(); // Pega o dia do mês (1-31)

      const currentConsumed = dailyAmountWater.get(day) || 0;
      dailyAmountWater.set(day, currentConsumed + entry.amountConsumed);
    });

    // 2. Prepara os dados para o gráfico (ex: para os últimos 30 dias)
    const xAxisDataMeal: number[] = [];
    const seriesDataMeal: (number | null)[] = []; // Usamos null para dias sem registro
    const xAxisDataWater: number[] = [];
    const seriesDataWater: (number | null)[] = []; // Usamos null para dias sem registro

    // Pega o dia atual para saber até onde preencher o gráfico
    const today = new Date();
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate(); // Pega o último dia do mês atual

    for (let day = 1; day <= endOfMonth; day++) {
      xAxisDataMeal.push(day);
      seriesDataMeal.push(
        day > today.getDate() ? null : dailyCaloriesMeal.get(day) || 0
      ); // Pega as calorias do mapa ou usa null
    }
    for (let day = 1; day <= endOfMonth; day++) {
      xAxisDataWater.push(day);
      seriesDataWater.push(
        day > today.getDate() ? null : dailyAmountWater.get(day) || 0
      ); // Pega as calorias do mapa ou usa null
    }

    return { xAxisDataMeal, seriesDataMeal, xAxisDataWater, seriesDataWater };
  }, [monthTrack]);

  const handleAdd = async (amount: number) => {
    console.log("handleAdd foi chamado às:", new Date().toLocaleTimeString());
    const token = sessionStorage.getItem("token");
    const body = {
      username: getUsernameFromToken(token || "") || "",
      amountConsumed: amount / 1000,
      consumedAt: new Date().toISOString(),
    };
    try {
      await axios
        .post("http://localhost:3030/tracker/water_entry", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((e) => {
          console.error("Erro ao registrar consumo de água:", e);
        });
    } catch (error) {
      console.error("Erro ao registrar consumo de água:", error);
    }
    setWaterAmount(waterAmount + amount);
  };

  const handleRemove = (amount: number) => {
    setWaterAmount((prev) => Math.max(prev - amount, 0));
  };

  const percentage = (waterAmount / waterGoal) * 100;

/*   const handleFoodSubmit = () => {
    if (foodInput.trim()) {
      alert(`Comida registrada: ${foodInput}`);
      setFoodInput("");
    }
  }; */

  return (
    <main className="super-container-water">
      <div className="graph-super-container">
        <div className="graph-days-container">
          {chartData.xAxisDataWater.length > 0 ? (
            <BarChart
              xAxis={[
                {
                  data: chartData.xAxisDataWater,
                  label: `Dias do Mês de ${new Date().toLocaleString("pt-BR", {
                    month: "long",
                  })}`,
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: chartData.seriesDataWater,
                  label: "Quantidade de Água Consumidas",
                  valueFormatter: (value) =>
                    value == null ? "" : `${value.toFixed(2)} L`,
                },
              ]}
              height={300}
            />
          ) : (
            <p>Carregando dados do gráfico...</p>
          )}
        </div>
        
        <div className="graph-water-container">
          <div className="water-section">
            <h1 className="title">Consumo de água</h1>
            <DropWater fillPercent={percentage} />
            <p className="water-level">
              {(waterAmount / 1000).toFixed(2)} L /{" "}
              {(MAX_CAPACITY / 1000).toFixed(1)} L
            </p>
            <div className="water-buttons">
              <button onClick={() => handleAdd(250)} className="btn">
                +250ml
              </button>
              <button onClick={() => handleAdd(500)} className="btn">
                +500ml
              </button>
              <button onClick={() => handleAdd(1000)} className="btn">
                +1L
              </button>
              <button onClick={() => handleRemove(250)} className="btn">
                -250ml
              </button>
            </div>
          </div>
        </div>

        <div className="graph-days-container">
          {chartData.xAxisDataMeal.length > 0 ? (
            <BarChart
              xAxis={[
                {
                  data: chartData.xAxisDataMeal,
                  label: `Dias do Mês de ${new Date().toLocaleString("pt-BR", {
                    month: "long",
                  })}`,
                  scaleType: "band", // MUDANÇA: 'band' é o ideal para gráficos de barras
                },
              ]}
              series={[
                {
                  data: chartData.seriesDataMeal,
                  label: "Calorias Consumidas",
                  valueFormatter: (value) =>
                    value == null ? "" : `${value.toFixed(0)} kcal`,
                },
              ]}
              height={300}
            />
          ) : (
            <p>Carregando dados do gráfico...</p>
          )}
          
        </div>

        <div className="graph-kcal-container">
          <h1 className="title">Calorias</h1>

          <p className="calories-info">
            {caloriesConsumed} / {caloriesTotal} kcal
          </p>

          <div className="progress-bar-water">
            <div
              className="progress-water-fill"
              style={{ width: `${(caloriesConsumed / caloriesTotal) * 100}%` }}
            />
          </div>
          <button onClick={() => setModalEstaAberto(true)} className="btn">
            Registrar Comida
          </button>
          <ModalForms
            open={modalEstaAberto}
            onOpenChange={setModalEstaAberto}
            onSubmit={handleFoodRegistration}
          />
          {/* <button onClick={handleFoodSubmit} className="btn">
            Registrar
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default Graphic;
