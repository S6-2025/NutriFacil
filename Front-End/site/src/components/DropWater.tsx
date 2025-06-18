import React, { useState, useEffect } from "react";

const DropWater: React.FC = () => {
  const [fillPercent, setFillPercent] = useState(0); // 0 a 100

  // Para animação suave, usamos um estado interno que atualiza com efeito
  const [animatedFill, setAnimatedFill] = useState(0);

  // Quando fillPercent muda, atualiza animatedFill suavemente
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedFill(fillPercent);
    }, 50); // delay pequeno para suavizar
    return () => clearTimeout(timeout);
  }, [fillPercent]);

  // Calcula altura e y do retângulo dentro do viewBox 24x24
  const svgHeight = 24;
  const fillHeight = (animatedFill / 100) * svgHeight;
  const fillY = svgHeight - fillHeight;

  const increase = (amount: number) => {
    setFillPercent((prev) => Math.min(100, prev + amount));
  };

  const decrease = (amount: number) => {
    setFillPercent((prev) => Math.max(0, prev - amount));
  };

  return (
    <div style={{ textAlign: "center" }}>
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

        {/* Base da gota - sempre visível */}
        <path
          d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6"
          fill="#81d4fa"
          stroke="#4fc3f7"
          strokeWidth="1"
        />

        {/* Água preenchida, animada */}
        <rect
          x="0"
          y={fillY}
          width="24"
          height={fillHeight}
          fill="#0288d1"
          clipPath="url(#dropClip)"
          style={{ transition: "y 0.5s ease, height 0.5s ease" }}
        />
      </svg>

      <p style={{ marginTop: 12, fontWeight: "bold", color: "#0077ff" }}>
        Water Level: {(fillPercent * 25).toFixed(0)} ml {/* 100% = 2500 ml */}
      </p>

      <div style={{ marginTop: 16 }}>
        <button onClick={() => increase(10)} style={buttonStyle}>
          +250ml
        </button>
        <button onClick={() => increase(20)} style={buttonStyle}>
          +500ml
        </button>
        <button onClick={() => increase(40)} style={buttonStyle}>
          +1L
        </button>
        <button onClick={() => decrease(10)} style={buttonStyle}>
          -250ml
        </button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  margin: "0 8px",
  padding: "8px 14px",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#0077ff",
  color: "white",
  border: "none",
  borderRadius: 8,
  boxShadow: "0 2px 6px rgba(0, 119, 255, 0.4)",
};

export default DropWater;
