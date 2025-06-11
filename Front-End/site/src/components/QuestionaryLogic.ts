import type { Dispatch, SetStateAction } from "react";

export type StepType = 
  | { type: "image"; title: string; imageUrl: string; description: string }
  | { type: "single"; question: string; options: string[] }
  | { type: "multiple"; question: string; options: string[] }
  | { type: "description"; text?: string; question: string; options: string[] }
  | { type: "input"; question: string; placeholder?: string };

  export const steps: StepType[] = [
  { type: "image", title: "Bem-vindo(a)!", imageUrl: "/select-green.svg", description: "Vamos iniciar um breve questionário para calcular seu TMB e IMC. É rápido e simples." },
  { type: "single", question: "Qual é o seu sexo biológico?", options: ["Masculino", "Feminino"] },
  { type: "input", question: "Qual a sua data de nascimento?", placeholder: "DD/MM/AAAA" },
  { type: "input", question: "Qual é a sua altura?", placeholder: "Insira sua altura"},
  { type: "input", question: "Qual é o seu peso?", placeholder: "Insira seu peso"},
  { type: "single", question: "Qual é o seu objetivo?",  options: ["Emagrecimento", "Hipertrofia", ]},
  { type: "multiple", question: "Possuí alguma alergia?",  options: ["Lactose", "Glúten","Proteína do Leite","Ovo","Frutos do Mar","Nenhuma" ]},
  { type: "single", question: "Qual tipo de Dieta deseja seguir?",  options: ["Mediterrânea", "Low Carb", "Cetogênica", "Vegetariana" ]},
  { type: "single", question: "Qual o seu nível de atividade física?",  options: ["Sedentário", "Leve", "Médio", "Alto" ]}
  ];


export type AnswersType = Record<number, string | string[]>;


type DietDTO = {
  objective?: string;
  type?: string;
  physicalActivityStatus?: string;
  alergy?: string;
};

export interface UserData {
  username?: string;
  fullname?: string;
  email?: string;
  password?: string;
  gender?: string;
  birth?: number | string;
  weight?: number;
  height?: number;
  diet?: DietDTO;
}

export function initUserData(initialData: Partial<UserData>): UserData {
  return {
    username: initialData.username || "",
    fullname: initialData.fullname || "",
    email: initialData.email || "",
    password: initialData.password || "",
  };
}


export const mapStepToField: { [key: number]: string } = {
  1: "gender",
  2: "birth",
  3: "height",
  4: "weight",
  5: "diet.objective",
  6: "diet.alergy",
  7: "diet.type",
  8: "diet.physicalActivityStatus"
};


export function handleSingleSelect(
  stepIndex: number,
  option: string,
  setAnswers: Dispatch<SetStateAction<AnswersType>>,
  setUserData?: Dispatch<SetStateAction<UserData>>
): void {
  // Atualiza a resposta do questionário
  setAnswers(prev => ({
    ...prev,
    [stepIndex]: option,
  }));

  // Se existir mapeamento do passo para userData, atualiza
  if (setUserData && mapStepToField[stepIndex]) {
    const fieldPath = mapStepToField[stepIndex];
    const fieldParts = fieldPath.split(".");

    setUserData(prev => {
      // Caso 1: campo simples (ex: gender, birth, weight, height)
      if (fieldParts.length === 1) {
        const field = fieldParts[0];
        let value: any = option;

        if (field === "weight" || field === "height") {
          value = Number(option);
        }

        if (field === "birth") {
          const parsedDate = new Date(option);
          if (!isNaN(parsedDate.getTime())) {
            value = parsedDate.toISOString().split("T")[0];
          } else {
            alert("Data de nascimento inválida: " + option);
            value = "";
          }
        }

        return {
          ...prev,
          [field]: value,
        };
      }

      // Caso 2: campo aninhado (ex: diet.objective, diet.type)
      const parentKey = fieldParts[0] as keyof UserData;
      const childKey = fieldParts[1];
      const parentValue = prev[parentKey] || {};

      const formattedOption =
        childKey === "objective" || childKey === "type" || childKey === "physicalActivityStatus"
          ? option
              .toUpperCase()
              .replace(/ /g, "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          : option;

      return {
        ...prev,
        [parentKey]: {
          ...(parentValue as object),
          [childKey]: formattedOption,
        },
      };
    });
  }
}

 export function handleMultipleSelect(
  stepIndex: number,
  option: string,
  setAnswers: Dispatch<SetStateAction<AnswersType>>,
  setUserData?: Dispatch<SetStateAction<UserData>>
): void {
  setAnswers(prev => {
    const current = Array.isArray(prev[stepIndex]) ? (prev[stepIndex] as string[]) : [];
    
    // Caso especial para a pergunta de alergias (stepIndex 6)
    if (stepIndex === 6) {
      if (option === "Nenhuma") {
        // Se clicou em "Nenhuma", retorna apenas ela (desmarca outras)
        return {
          ...prev,
          [stepIndex]: current.includes("Nenhuma") ? [] : ["Nenhuma"]
        };
      } else {
        // Se clicou em outra opção, verifica se "Nenhuma" está marcada
        if (current.includes("Nenhuma")) {
          return prev; // Não faz nada se "Nenhuma" estiver marcada
        }
        // Lógica normal para múltipla seleção
        return {
          ...prev,
          [stepIndex]: current.includes(option)
            ? current.filter(o => o !== option)
            : [...current, option],
        };
      }
    }

    // Lógica normal para outras perguntas múltiplas
    return {
      ...prev,
      [stepIndex]: current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option],
    };
  });

  if (setUserData && mapStepToField[stepIndex]) {
    const field = mapStepToField[stepIndex];
    const fieldParts = field.split(".");

    setUserData((prev: any) => {
      if (fieldParts.length === 1) {
        return {
          ...prev,
          [field]: Array.isArray(prev[field]) ? [...prev[field], option] : [option],
        }
      } else {
        const parentKey = fieldParts[0] as keyof UserData;
        const childKey = fieldParts[1];
        const prevParentValue = prev[parentKey] || {};

        // Lógica especial para alergias
        if (stepIndex === 6) {
          let newValue;
          if (option === "Nenhuma") {
            newValue = prev[stepIndex]?.includes("Nenhuma") ? [] : ["Nenhuma"];
          } else {
            if (prevParentValue[childKey]?.includes("Nenhuma")) {
              return prev; // Não atualiza se "Nenhuma" estiver marcada
            }
            newValue = Array.isArray(prevParentValue[childKey]) 
              ? prevParentValue[childKey].includes(option)
                ? prevParentValue[childKey].filter((o: string) => o !== option)
                : [...prevParentValue[childKey], option]
              : [option];
          }

          return {
            ...prev,
            [parentKey]: {
              ...(prevParentValue as object),
              [childKey]: newValue
            }
          };
        }

        // Lógica normal para outros campos
        return {
          ...prev,
          [parentKey]: {
            ...(prevParentValue as object),
            [childKey]: Array.isArray(prevParentValue[childKey]) 
              ? [...prevParentValue[childKey], option] 
              : [option],
          }
        }
      }
    });
  }
}


export function handleNextStep(
  currentStep: number,
  setCurrentStep: Dispatch<SetStateAction<number>>,
  totalSteps: number
): void {
  if (currentStep < totalSteps - 1) {
    setCurrentStep(currentStep + 1);
  }
}

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
