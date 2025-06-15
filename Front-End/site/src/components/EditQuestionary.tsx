import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import {
  steps,
  mapStepToField,
  handleSingleSelect,
  handleMultipleSelect,
  initUserData,
  allergyLabelToEnum,
} from "./QuestionaryLogic";

import type { UserData, AnswersType } from "./QuestionaryLogic";
import { useNavigate } from "react-router-dom";

function QuestionaryEdit() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({});
  const [userData, setUserData] = useState<UserData>(initUserData({}));
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar dados do usuário e preencher o estado inicial
    // Exemplo:
    // fetchProfile().then(data => {
    //   setUserData(data);
    //   // Também preencher answers para mostrar selecionados
    //   // Faça a lógica para mapear data para answers aqui
    // });
  }, []);

  function handleNextStepSkip(
    currentStep: number,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    totalSteps: number
  ) {
    let nextStep = currentStep + 1;

    // Pula o step 2 (data de nascimento)
    if (nextStep === 2) {
      nextStep = 3;
    }

    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
    }
  }

  async function handleOptionClick(option: string) {
    const step = steps[currentStep];

    if (step.type === "single") {
      handleSingleSelect(currentStep, option, setAnswers, setUserData);
    } else if (step.type === "multiple") {
      handleMultipleSelect(currentStep, option, setAnswers, setUserData);
    } else if (step.type === "description") {
      handleSingleSelect(currentStep, option, setAnswers);
      handleNextStepSkip(currentStep, setCurrentStep, steps.length);
    }
  }

  async function handleFinish() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado.");

      const res = await fetch("http://localhost:3030/profile/questionary", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Erro ao atualizar o questionário.");

      alert("Informações atualizadas com sucesso!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar questionário.");
    }
  }

  const step = steps[currentStep];

  return (
    <main className="questionary-container">
      <ProgressBar
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={steps.length}
      />

      {/* Step tipo image */}
      {step.type === "image" && (
        <div className="step-image">
          <h2>Edição de informações</h2>
          <img src={step.imageUrl} alt={step.title} />
          <p>Clique no botão abaixo para continuar</p>
          <div className="button-wrapper">
            <button
              className="continues"
              onClick={() =>
                handleNextStepSkip(currentStep, setCurrentStep, steps.length)
              }
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step.type === "input" && currentStep !== 2 && (
        <div className="step-input" style={{ position: "relative" }}>
          <h3>{step.question}</h3>
          <input
            id="input-text"
            type="text"
            placeholder={step.placeholder}
            value={(answers[currentStep] as string) || ""}
            onChange={(e) => {
              let value = e.target.value;

              if (currentStep === 3) {
                // Altura: formata e valida
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
                // Peso: só números e valida range
                value = value.replace(/\D/g, "");
                const numValue = Number(value);
                if (numValue < 0 || numValue > 1000) return;

                setAnswers((prev) => ({ ...prev, [currentStep]: value }));
                setUserData((prev) => ({ ...prev, weight: numValue }));
                return;
              }

              const field = mapStepToField[currentStep];
              setAnswers((prev) => ({ ...prev, [currentStep]: value }));
              setUserData((prev) => ({ ...prev, [field]: value || undefined }));
            }}
          />
          {currentStep === 3 && <span className="unit-label">m</span>}
          {currentStep === 4 && <span className="unit-label">kg</span>}

          <div className="button-wrapper">
            <button
              className="continues"
              onClick={() =>
                handleNextStepSkip(currentStep, setCurrentStep, steps.length)
              }
              disabled={!answers[currentStep]}
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
                    answers[currentStep] === option
                      ? "selected"
                      : "no-selected"
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
                  handleNextStepSkip(currentStep, setCurrentStep, steps.length)
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
          <ul>
            {step.options.map((option) => {
              const enumValue = allergyLabelToEnum[option] || option;
              const isSelected =
                Array.isArray(answers[currentStep]) &&
                (answers[currentStep] as string[]).includes(enumValue);

              return (
                <li key={option}>
                  <button
                    onClick={() => handleOptionClick(option)}
                    className={`multiple-options ${
                      isSelected ? "selected" : "no-selected"
                    }`}
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
                handleNextStepSkip(currentStep, setCurrentStep, steps.length)
              }
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
            Atualizar Dados
          </button>
        </div>
      )}
    </main>
  );
}

export default QuestionaryEdit;
