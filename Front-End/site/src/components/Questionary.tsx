import { useState } from "react";
import {
  steps,
  handleSingleSelect,
  handleMultipleSelect,
} from "./QuestionaryLogic";
import type { StepType } from "./QuestionaryLogic";
export default function Questionary() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const currentStep: StepType = steps[stepIndex];

  function handleNext() {
    setStepIndex(prev => prev + 1);
  }

  return (
    <main className="super-container">
      {currentStep.type === "image" && (
        <div className="step-image">
          <h2>{currentStep.title}</h2>
          <img src={currentStep.imageUrl} alt={currentStep.title} />
          <button onClick={handleNext}>Continue</button>
        </div>
      )}

      {currentStep.type === "description" && (
        <div className="step-description">
          <p>{currentStep.text}</p>
          <h3>{currentStep.question}</h3>
          <ul>
            {currentStep.options.map((option, i) => (
              <li key={i} onClick={() => handleSingleSelect(stepIndex, option, setAnswers)}>
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handleNext}>Continue</button>
        </div>
      )}

      {currentStep.type === "single" && (
        <div className="step-single">
          <h3>{currentStep.question}</h3>
          <ul>
            {currentStep.options.map((option, i) => (
              <li key={i} onClick={() => handleSingleSelect(stepIndex, option, setAnswers)}>
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handleNext}>Continue</button>
        </div>
      )}

      {currentStep.type === "multiple" && (
        <div className="step-multiple">
          <h3>{currentStep.question}</h3>
          <ul>
            {currentStep.options.map((option, i) => (
              <li key={i} onClick={() => handleMultipleSelect(stepIndex, option, setAnswers)}>
                {answers[stepIndex]?.includes(option) ? "☑" : "☐"} {option}
              </li>
            ))}
          </ul>
          <button onClick={handleNext}>Continue</button>
        </div>
      )}
    </main>
  );
}
