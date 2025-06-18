import React, { useState } from "react";
// precisa criar esse CSS

const MAX_CAPACITY = 2500; // 2,5L em ml

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
      <div className="personalize-container">
        <div className="glass-container">
<div className="glass">
  <div className="water-fill" style={{ height: `${percentage}%` }} />
  {percentage > 0 && (
    <svg
      className="wave"
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
      style={{ bottom: `calc(${percentage}% - 10px)` }}
    >
      <path
        d="M0 20 Q 25 0, 50 20 T 100 20 T 150 20 T 200 20 V40 H0 Z"
        fill="#4fc3f7"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0 0; -50 0; 0 0"
          dur="15s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )}
</div>



          <p>{(waterAmount / 1000).toFixed(2)} L</p>
        </div>

        <div className="buttons">
          <button onClick={() => handleAdd(250)}>+250ml</button>
          <button onClick={() => handleAdd(500)}>+500ml</button>
          <button onClick={() => handleAdd(1000)}>+1L</button>
          <button onClick={() => handleRemove(250)}>-250ml</button>
        </div>
      </div>
    </main>
  );
};

export default Graphic;
