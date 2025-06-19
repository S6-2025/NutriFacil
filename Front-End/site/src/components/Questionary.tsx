import { useState } from "react";
import ProgressBar from "./ProgressBar";
import {
  steps,
  mapStepToField,
  handleSingleSelect,
  handleMultipleSelect,
  handleNextStep,
  initUserData,
  allergyLabelToEnum
} from "./QuestionaryLogic";

import type { UserData, AnswersType } from "./QuestionaryLogic";
import { useNavigate } from "react-router-dom";

function Questionary() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({});
  const [userData, setUserData] = useState<UserData>(initUserData({}));
  const navigate = useNavigate();

  async function handleOptionClick(option: string) {
    const step = steps[currentStep];
     console.log("Current answers for step:", answers[currentStep]);
  console.log("Option:", option);


    if (step.type === "single") {
      handleSingleSelect(currentStep, option, setAnswers, setUserData);
      // Não avança automaticamente, espera o clique no botão Continuar
    } else if (step.type === "multiple") {
      handleMultipleSelect(currentStep, option, setAnswers, setUserData);
    } else if (step.type === "description") {
      handleSingleSelect(currentStep, option, setAnswers);
      handleNextStep(currentStep, setCurrentStep, steps.length);
    }
  }

  function isValidDate(dateString: string) {
    // Validação básica de formato YYYY-MM-DD
    if (!dateString) return false;
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
  }

  async function handleFinish() {
    console.log(userData);
    navigate("/register", {
      state: userData,
    });
  }

  const step = steps[currentStep];

 


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
          <img src={step.imageUrl} alt={step.title}  id="image-quest"/>
          <p>{step.description}</p>
          <div className="button-wrapper">
            <button
              className="continues"
              onClick={() =>
                handleNextStep(currentStep, setCurrentStep, steps.length)
              }
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      {step.type === "input" && (
        <div className="step-input" style={{ position: "relative" }}>
          <h3>{step.question}</h3>

          {currentStep === 2 ? (
            <input
              type="date"
              placeholder={step.placeholder}
              value={(answers[currentStep] as string) || ""}
              onChange={(e) => {
                const value = e.target.value;
                setAnswers((prev) => ({
                  ...prev,
                  [currentStep]: value,
                }));
                const field = mapStepToField[currentStep];
                setUserData((prev) => ({
                  ...prev,
                  [field]: value || undefined,
                }));
              }}
            />
          ) : (
            <>
              <input
                id="input-text"
                type="text"
                placeholder={step.placeholder}
                value={(answers[currentStep] as string) || ""}
                onChange={(e) => {
                  let value = e.target.value;

                  if (currentStep === 3) {
                    // ALTURA
                    value = value.replace(/\D/g, "");
                    if (value.length === 0) {
                      setAnswers((prev) => ({ ...prev, [currentStep]: "" }));
                      setUserData((prev) => ({ ...prev, height: undefined }));
                      return;
                    }
                    if (value.length > 3) value = value.slice(0, 3);
                    if (value.length === 1) {
                      value = value;
                    } else {
                      value = value.slice(0, 1) + "." + value.slice(1);
                    }
                    const numericValue = parseFloat(value);
                    if (numericValue < 0.5 || numericValue > 2.99) return;

                    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
                    setUserData((prev) => ({ ...prev, height: numericValue }));
                    return;
                  }

                  if (currentStep === 4) {
                    // PESO
                    value = value.replace(/\D/g, "");
                    const numValue = Number(value);
                    if (numValue < 0 || numValue > 1000) return;

                    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
                    setUserData((prev) => ({ ...prev, weight: numValue }));
                    return;
                  }

                  // Outros campos
                  setAnswers((prev) => ({ ...prev, [currentStep]: value }));
                  const field = mapStepToField[currentStep];
                  setUserData((prev) => ({
                    ...prev,
                    [field]: value || undefined,
                  }));
                }}
              />

  {currentStep === 3 && <span className="unit-label">m</span>}
  {currentStep === 4 && <span className="unit-label">kg</span>}
</>
    )}

    <div className="button-wrapper">
      <button
        className="continues"
        onClick={() =>
          handleNextStep(currentStep, setCurrentStep, steps.length)
        }
        disabled={
          !answers[currentStep] ||
          (currentStep === 2 && !isValidDate(answers[currentStep] as string))
        }
      >
        Continuar
      </button>
    </div>
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
                  className={
                    answers[currentStep] === option ? "selected" : "no-selected"
                  }
                >
                  {option}
                  {answers[currentStep] === option && <span> ✓</span>}
                </button>
              </li>
            ))}
          </ul>

          {currentStep < steps.length - 1 && (
            <div className="button-wrapper">
              <button
                className="continues"
                onClick={() =>
                  handleNextStep(currentStep, setCurrentStep, steps.length)
                }
                disabled={!answers[currentStep]}
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      )}

    {step.type === "multiple" && (
  <div className="step-multiple">
    <h3>{step.question}</h3>
    <ul id="multiples-choices">
     {step.options.map((option) => {
  const enumValue = allergyLabelToEnum[option] || option;

  const isSelected =
    Array.isArray(answers[currentStep]) &&
    (answers[currentStep] as string[]).includes(enumValue);

  return (
    <li key={option}>
      <button id="button-multiples"
        onClick={() => handleOptionClick(option)}
        className={`multiple-options ${isSelected ? "selected" : "no-selected"}`}
      >
        {option}
        {isSelected && <span> ✓</span>}
      </button>
    </li>
  );
})}

    </ul>

    <div className="button-wrapper">
      <button
        className="continues"
        onClick={() =>
          handleNextStep(currentStep, setCurrentStep, steps.length)
        }
        // opcional: pode desabilitar botão se nenhuma opção selecionada
        // disabled={!Array.isArray(answers[currentStep]) || answers[currentStep].length === 0}
      >
        Continuar
      </button>
    </div>
  </div>
)}


      {currentStep === steps.length - 1 && (
        <div className="button-wrapper-final">
          <button
            className="submit"
            onClick={handleFinish}
            disabled={!answers[currentStep]}
          >
            Finalizar Registro
          </button>
        </div>
      )}
    </main>
  );
}

export default Questionary;
