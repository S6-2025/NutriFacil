import React, { useState, useEffect } from "react";
import axios from "axios";
import DropWater from "../components/DropWater"; // ajuste o caminho conforme a sua estrutura
import { jwtDecode } from "jwt-decode";

import { LineChart } from "@mui/x-charts/LineChart";
import type {} from "@mui/x-charts/themeAugmentation";

const MAX_CAPACITY = 2500;

const Graphic: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState(0);
  const [waterGoal, setWaterGoal] = useState(MAX_CAPACITY);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState(1200);
  const [foodInput, setFoodInput] = useState("");

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

        console.log("Dados recebidos:", dailyTrackRes);

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
    setWaterAmount(waterAmount + amount)
  };

  const handleRemove = (amount: number) => {
    setWaterAmount((prev) => Math.max(prev - amount, 0));
  };

  const percentage = (waterAmount / waterGoal) * 100;

  const handleFoodSubmit = () => {
    
    if (foodInput.trim()) {
      alert(`Comida registrada: ${foodInput}`);
      setFoodInput("");
    }
  };

  return (
    <main className="super-container">
      <div className="graph-super-container">
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

        <div className="graph-kcal-container">
          <h1 className="title">Calorias</h1>

          <p className="calories-info">
            {caloriesConsumed} / {caloriesTotal} kcal
          </p>

          <div className="progress-bar">
            <div
              className="progress-water-fill"
              style={{ width: `${(caloriesConsumed / caloriesTotal) * 100}%` }}
            />

           
          </div>
           <input
              type="text"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              placeholder="Registrar comida..."
              className="input"
            />

          <button onClick={handleFoodSubmit} className="btn">
            Registrar
          </button>
        </div>

        <div className="graph-days-container">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={300}
          />
        </div>
      </div>
    </main>
  );
};

export default Graphic;
