import React, { useState } from "react";

const MAX_CAPACITY = 2500; // 2,5L em ml

// Componente da gota de água
const DropWater = ({ fillPercent }: { fillPercent: number }) => {
  const svgSize = 96;
  const viewBoxSize = 24;

  const fillHeight = (fillPercent / 100) * viewBoxSize;
  const fillY = viewBoxSize - fillHeight;

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 24 24"
      style={{ display: "block", margin: "auto" }}
    >
      <defs>
        <clipPath id="dropClip">
          <path d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6" />
        </clipPath>
      </defs>

      {/* Gota base - sempre visível */}
      <path
        d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6"
        fill="#81d4fa"
        stroke="#4fc3f7"
        strokeWidth="1"
      />

      {/* Água preenchida */}
      <rect
        x="0"
        y={fillY}
        width="24"
        height={fillHeight}
        fill="#0288d1"
        clipPath="url(#dropClip)"
        style={{
          transition: "height 0.5s ease, y 0.5s ease",
        }}
      />
    </svg>
  );
};

const Graphic: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState(0);

  const handleAdd = (amount: number) => {
    setWaterAmount((prev) => Math.min(prev + amount, MAX_CAPACITY));
  };

  const handleRemove = (amount: number) => {
    setWaterAmount((prev) => Math.max(prev - amount, 0));
  };

  const percentage = (waterAmount / MAX_CAPACITY) * 100;

  return (
    <main className="super-container">
      <div className="graph-water-container">
        <h1 style={{ textAlign: "center", color: "#0077ff" }}>
          Consumo de água
        </h1>

        <DropWater fillPercent={percentage} />

        <p style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}>
          {(waterAmount / 1000).toFixed(2)} L
        </p>

        <div
          className="buttons"
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button onClick={() => handleAdd(250)} style={buttonStyle}>
            +250ml
          </button>
          <button onClick={() => handleAdd(500)} style={buttonStyle}>
            +500ml
          </button>
          <button onClick={() => handleAdd(1000)} style={buttonStyle}>
            +1L
          </button>
          <button onClick={() => handleRemove(250)} style={buttonStyle}>
            -250ml
          </button>
        </div>
      </div>

      <div className="graph-kcal-container"></div>
    </main>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 14px",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#0077ff",
  color: "white",
  border: "none",
  borderRadius: 8,
  boxShadow: "0 2px 6px rgba(0, 119, 255, 0.4)",
};

export default Graphic;
