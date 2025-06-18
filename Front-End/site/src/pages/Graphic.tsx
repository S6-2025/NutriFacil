import React, { useState, useEffect } from "react";
import axios from "axios";
import DropWater from "../components/DropWater"; // ajuste o caminho conforme a sua estrutura

const MAX_CAPACITY = 2500;

const Graphic: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState(1200);
  const [foodInput, setFoodInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token!.split(".")[1]));
        const username = payload.username;

        const res = await axios.get(`http://localhost:3030/diet/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWaterAmount(res.data.waterConsume);
        setCaloriesConsumed(res.data.caloriesConsume);
        // Se o total de calorias também vier da API, descomente:
        // setCaloriesTotal(res.data.caloriesTarget);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      }
    };
    fetchData();
  }, []);

  const handleAdd = (amount: number) => {
    setWaterAmount((prev) => Math.min(prev + amount, MAX_CAPACITY));
  };

  const handleRemove = (amount: number) => {
    setWaterAmount((prev) => Math.max(prev - amount, 0));
  };

  const percentage = (waterAmount / MAX_CAPACITY) * 100;

  const handleFoodSubmit = () => {
    if (foodInput.trim()) {
      alert(`Comida registrada: ${foodInput}`);
      setFoodInput("");
    }
  };

  return (
    <main className="super-container">
      <div className="graph-water-container">
        <div style={{ margin: "2rem auto", maxWidth: 200, textAlign: "center" }}>
          <h1 style={{ color: "#0077ff" }}>Consumo de água</h1>
          <DropWater fillPercent={percentage} />
          <p style={{ fontWeight: "bold", marginTop: 8 }}>
            {(waterAmount / 1000).toFixed(2)} L / {(MAX_CAPACITY / 1000).toFixed(1)} L
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => handleAdd(250)} style={buttonStyle}>+250ml</button>
            <button onClick={() => handleAdd(500)} style={buttonStyle}>+500ml</button>
            <button onClick={() => handleAdd(1000)} style={buttonStyle}>+1L</button>
            <button onClick={() => handleRemove(250)} style={buttonStyle}>-250ml</button>
          </div>
        </div>
      </div>

      <div className="graph-kcal-container" style={kcalContainerStyle}>
        <h1 style={titleStyle}>Calorias</h1>

        <p style={textStyle}>
          {caloriesConsumed} / {caloriesTotal} kcal
        </p>

        <div style={progressBarWrapper}>
          <div
            style={{
              ...progressBarFill,
              width: `${(caloriesConsumed / caloriesTotal) * 100}%`,
            }}
          />
        </div>

        <input
          type="text"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          placeholder="Registrar comida..."
          style={inputStyle}
        />
        <button onClick={handleFoodSubmit} style={buttonStyle}>
          Registrar
        </button>
      </div>
    </main>
  );
};

const kcalContainerStyle: React.CSSProperties = {
  maxWidth: 300,
  margin: "2rem auto",
  padding: "1rem",
  backgroundColor: "#f5faff",
  borderRadius: 10,
  boxShadow: "0 0 8px rgba(0, 119, 255, 0.2)",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#0077ff",
};

const textStyle: React.CSSProperties = {
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: 10,
};

const progressBarWrapper: React.CSSProperties = {
  width: "100%",
  height: 20,
  backgroundColor: "#ddd",
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 12,
};

const progressBarFill: React.CSSProperties = {
  height: "100%",
  backgroundColor: "#4fc3f7",
  transition: "width 0.5s ease",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 8,
  marginBottom: 8,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  fontWeight: "bold",
  backgroundColor: "#0077ff",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

export default Graphic;