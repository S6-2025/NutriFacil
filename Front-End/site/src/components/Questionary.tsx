import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { registerUser } from "../services/authService";
import {
  steps,
  handleSingleSelect,
  handleMultipleSelect,
  handleNextStep,
  finishRegistration,
  initUserData,
 
} from "./QuestionaryLogic";

import type { UserData,
  AnswersType} from './QuestionaryLogic'

interface QuestionaryProps {
  registerUser: (data: any) => Promise<void>; // função para registrar na API, você passa por props
}

function Questionary({ registerUser }: QuestionaryProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({});
  const [userData, setUserData] = useState<UserData>(initUserData({}));

  async function handleOptionClick(option: string) {
    const step = steps[currentStep];

    if (step.type === "single") {
      // Para os passos do tipo dados pessoais, atualizamos userData
      if (currentStep >= 1 && currentStep <= 4) {
        handleSingleSelect(currentStep, option, setAnswers, setUserData);
      } else {
        handleSingleSelect(currentStep, option, setAnswers);
      }
      handleNextStep(currentStep, setCurrentStep, steps.length);
    } else if (step.type === "multiple") {
      handleMultipleSelect(currentStep, option, setAnswers);
    } else if (step.type === "description") {
      handleSingleSelect(currentStep, option, setAnswers);
      handleNextStep(currentStep, setCurrentStep, steps.length);
    }
    // No passo image não há opção para clicar (botão continua)
  }

  async function handleFinish() {
    await finishRegistration(userData, answers, registerUser);
    // Aqui você pode redirecionar ou mostrar mensagem de sucesso
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
          <img src={step.imageUrl} alt={step.title} />
          <p>{step.description}</p>
          <button className="continues" onClick={() => handleNextStep(currentStep, setCurrentStep, steps.length)}>
            Continuar
          </button>
        </div>
      )}

      {(step.type === "description" || step.type === "single") && (
        <div className={`step-${step.type === "description" ? "description" : "single"}`}>
          <h3>{step.question}</h3>
          <ul>
            {step.options.map((option) => (
              <li key={option}>
                <button onClick={() => handleOptionClick(option)} className="options">
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
                  className={`multiple-options ${
                    Array.isArray(answers[currentStep]) && (answers[currentStep] as string[]).includes(option)
                      ? "selected"
                      : ""
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <button className="continues" onClick={() => handleNextStep(currentStep, setCurrentStep, steps.length)}>
            Next
          </button>
        </div>
      )}

      {/* Botão final de envio aparece no último passo */}
      {currentStep === steps.length - 1 && (
        <button className="submit" onClick={handleFinish}>
          Finalizar Registro
        </button>
      )}
    </main>
  );
}

export default Questionary;
