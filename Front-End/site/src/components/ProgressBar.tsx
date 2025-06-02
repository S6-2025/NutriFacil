import type { Dispatch, SetStateAction } from "react";

import "./../css/Questionary.css";

type ProgressBarProps = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  totalSteps: number;
};

function ProgressBar({ currentStep, setCurrentStep, totalSteps }: ProgressBarProps) {
  // Garante que começa em 10% e termina em 100%
  const stepPercentage = 100 / totalSteps;
  const progress = stepPercentage * (currentStep + 1);

  return (
    <div className="progress-container">
      <div
        className="arrow"
        onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}
      >
        <svg className="header__SVG">
          <use xlinkHref="/icons.svg#arrow" />
        </svg>
      </div>

      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
