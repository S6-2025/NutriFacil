import { useState } from "react";
import ProgressBar from "./ProgressBar";
import {
  steps,
  handleSingleSelect,
  handleMultipleSelect,
} from "./QuestionaryLogic"; // ajuste o path se necessário
import type { AnswersType } from "./QuestionaryLogic";
import "./../css/Questionary.css";

function Questionary() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({});

  const step = steps[currentStep];

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleOptionClick(option: string) {
    if (step.type === "single") {
      handleSingleSelect(currentStep, option, setAnswers);
      handleNext();
    } else if (step.type === "multiple") {
      handleMultipleSelect(currentStep, option, setAnswers);
    } else if (step.type === "description") {
      handleSingleSelect(currentStep, option, setAnswers);
      handleNext();
    }
  }

  return (
    <main className="questionary-container">
      <ProgressBar
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={steps.length}
      />

      {step.type === "image" && (
        <div className="step-image">
          <h2>{step.title}</h2>
          <img src={step.imageUrl} alt={step.title} />
          <p>{step.description}</p>
          <button className="continues" onClick={handleNext}>
            Continuar
          </button>
        </div>
      )}

      {step.type === "description" && (
        <div className="step-description">
          <p className="description-text">{step.text}</p>
          <h3>{step.question}</h3>
          <ul>
            {step.options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className="options"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.type === "single" && (
        <div className="step-single">
          <h3>{step.question}</h3>
          <ul>
            {step.options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className="options"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.type === "multiple" && (
        <div className="step-multiple">
          <h3>{step.question}</h3>
          <ul>
            {step.options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`options ${
                    Array.isArray(answers[currentStep]) &&
                    (answers[currentStep] as string[]).includes(option)
                      ? "selected"
                      : ""
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <button className="continues" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default Questionary;
