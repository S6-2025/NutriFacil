import React, { useState, useEffect } from "react";
import axios from "axios";

const MAX_CAPACITY = 2500; // 2,5L em ml

const DropWater = ({ fillPercent }: { fillPercent: number }) => {
  const viewBoxSize = 24;
  const fillHeight = (fillPercent / 100) * viewBoxSize;
  const fillY = viewBoxSize - fillHeight;

  return (
    <svg
      width={96}
      height={96}
      viewBox="0 0 24 24"
      style={{ display: "block", margin: "auto" }}
    >
      <defs>
        <clipPath id="dropClip">
          <path d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6" />
        </clipPath>
      </defs>
      {/* Gota */}
      <path
        d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6"
        fill="#81d4fa"
        stroke="#4fc3f7"
        strokeWidth="1"
      />
      {/* Água */}
      <rect
        x="0"
        y={fillY}
        width="24"
        height={fillHeight}
        fill="#0288d1"
        clipPath="url(#dropClip)"
        style={{ transition: "height 0.6s ease, y 0.6s ease" }}
      />
    </svg>
  );
};

const Graphic: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState(0);

  // buscar consumo ao iniciar
  useEffect(() => {
    const fetchWater = async () => {
      try {
        const token = localStorage.getItem("token");
        // extrair username do token JWT
        const payload = JSON.parse(atob(token!.split(".")[1]));
        const username = payload.username;

        const res = await axios.get<{ waterConsume: number }>(
          `http://localhost:3030/diet/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWaterAmount(res.data.waterConsume);
      } catch (e) {
        console.error("Erro ao carregar consumo de água:", e);
      }
    };
    fetchWater();
  }, []);

  const handleAdd = (amount: number) => {
    setWaterAmount((prev) => Math.min(prev + amount, MAX_CAPACITY));
    // aqui você pode fazer POST ou PATCH para atualizar no back
  };

  const handleRemove = (amount: number) => {
    setWaterAmount((prev) => Math.max(prev - amount, 0));
    // idem: atualize o back se desejar
  };

  const percentage = (waterAmount / MAX_CAPACITY) * 100;

  return (
    <main className="super-container">
      <div className="graph-water-container">

         <div style={{ margin: "2rem auto", maxWidth: 200, textAlign: "center" }}>
        <h1 style={{ color: "#0077ff" }}>Consumo de água</h1>
        <DropWater fillPercent={percentage} />
        <p style={{ fontWeight: "bold", marginTop: 8 }}>
          {(waterAmount / 1000).toFixed(2)} L
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => handleAdd(250)} style={buttonStyle}>+250ml</button>
          <button onClick={() => handleAdd(500)} style={buttonStyle}>+500ml</button>
          <button onClick={() => handleAdd(1000)} style={buttonStyle}>+1L</button>
          <button onClick={() => handleRemove(250)} style={buttonStyle}>-250ml</button>
        </div>
      </div>
      </div>
     


      <div className="graph-kcal-container"></div>
    </main>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 14px",
  background: "#0077ff",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer",
};

export default Graphic;
