import type { Dispatch, SetStateAction } from "react";

// Tipo dos passos do questionário
export type StepType = 
  | { type: "image"; title: string; imageUrl: string; description: string }
  | { type: "single"; question: string; options: string[] }
  | { type: "multiple"; question: string; options: string[] }
  | { type: "description"; text?: string; question: string; options: string[] };

// Passos do questionário (exemplo, adapte conforme sua necessidade)
export const steps: StepType[] = [
  { type: "image", title: "Bem-vindo(a)!", imageUrl: "/select-green.svg", description: "lorem asd asssss ssushdasuad sdasuhda" },
  { type: "single", question: "Gender?", options: ["Male", "Female", "Other"] },
  { type: "single", question: "Age?", options: ["18", "25", "30"] },
  { type: "single", question: "Weight?", options: ["60", "70", "80"] },
  { type: "single", question: "Height?", options: ["160", "170", "180"] },
  // outros passos...
];

// Tipo das respostas, indexado pelo número do passo
export type AnswersType = Record<number, string | string[]>;

// Estrutura combinada para os dados do usuário
export interface UserData {
  username?: string;
  fullname?: string;
  email?: string;
  password?: string;
  gender?: string;
  age?: number;
  weight?: number;
  height?: number;
  questionnaireAnswers?: AnswersType;
}

// Inicializa userData com dados iniciais (exemplo vindo do registro)
export function initUserData(initialData: Partial<UserData>): UserData {
  return {
    username: initialData.username || "",
    fullname: initialData.fullname || "",
    email: initialData.email || "",
    password: initialData.password || "",
  };
}

// Mapeia o índice do passo para o campo do UserData a ser atualizado
const mapStepToField: Record<number, keyof UserData> = {
  1: "gender",
  2: "age",
  3: "weight",
  4: "height",
};

// Atualiza resposta simples e userData se for dado pessoal
export function handleSingleSelect(
  stepIndex: number,
  option: string,
  setAnswers: Dispatch<SetStateAction<AnswersType>>,
  setUserData?: Dispatch<SetStateAction<UserData>>
): void {
  setAnswers(prev => ({
    ...prev,
    [stepIndex]: option,
  }));

  if (setUserData && mapStepToField[stepIndex]) {
    const field = mapStepToField[stepIndex];
    setUserData(prev => ({
      ...prev,
      [field]: field === "age" || field === "weight" || field === "height" ? Number(option) : option,
    }));
  }
}

// Atualiza respostas múltiplas
export function handleMultipleSelect(
  stepIndex: number,
  option: string,
  setAnswers: Dispatch<SetStateAction<AnswersType>>
): void {
  setAnswers(prev => {
    const current = Array.isArray(prev[stepIndex]) ? (prev[stepIndex] as string[]) : [];
    return {
      ...prev,
      [stepIndex]: current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option],
    };
  });
}

// Avança para o próximo passo, se houver
export function handleNextStep(
  currentStep: number,
  setCurrentStep: Dispatch<SetStateAction<number>>,
  totalSteps: number
): void {
  if (currentStep < totalSteps - 1) {
    setCurrentStep(currentStep + 1);
  }
}

// Finaliza o registro chamando a API, juntando dados e respostas
export async function finishRegistration(
  userData: UserData,
  answers: AnswersType,
  registerUser: (data: any) => Promise<void>
): Promise<void> {
  const finalData = {
    ...userData,
    questionnaireAnswers: answers,
  };

  await registerUser(finalData);
}
