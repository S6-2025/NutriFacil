import React from "react";

interface DropWaterProps {
  fillPercent: number;
}

const DropWater: React.FC<DropWaterProps> = ({ fillPercent }) => {
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

      <path
        d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6"
        fill="#81d4fa"
        stroke="#4fc3f7"
        strokeWidth="1"
      />

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

export default DropWater;
