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
  { type: "input", question: "Qual é a sua altura?", placeholder: "Insira sua altura" },
  { type: "input", question: "Qual é o seu peso?", placeholder: "Insira seu peso" },
  { type: "single", question: "Qual é o seu objetivo?", options: ["Emagrecimento", "Hipertrofia"] },
  { type: "multiple", question: "Possuí alguma alergia?", options: ["Lactose", "Glúten", "Proteína do Leite", "Ovo", "Frutos do Mar", "Nenhuma"] },
  { type: "single", question: "Qual tipo de Dieta deseja seguir?", options: ["Mediterrânea", "Low Carb", "Cetogênica", "Vegetariana"] },
  { type: "single", question: "Qual o seu nível de atividade física?", options: ["Sedentário", "Leve", "Médio", "Alto"] }
];

export type AnswersType = Record<number, string | string[]>;

type DietDTO = {
  objective?: string;
  type?: string;
  physicalActivityStatus?: string;
  allergies?: string[];
};

export interface UserData {
  username?: string;
  fullname?: string;
  email?: string;
  password?: string;
  gender?: string;
  birthdate?: number | string;
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
  2: "birthdate",
  3: "height",
  4: "weight",
  5: "diet.objective",
  6: "diet.allergies",
  7: "diet.type",
  8: "diet.physicalActivityStatus"
};

export const allergyLabelToEnum: Record<string, string> = {
  "Lactose": "LACTOSE",
  "Glúten": "GLUTEN",
  "Proteína do Leite": "PROTEINA_DO_LEITE",
  "Ovo": "OVO",
  "Frutos do Mar": "FRUTOS_DO_MAR",
  "Nenhuma": "NONE",
};

export function handleMultipleSelect(
  stepIndex: number,
  option: string,
  setAnswers: Dispatch<SetStateAction<AnswersType>>,
  setUserData?: Dispatch<SetStateAction<UserData>>
): void {
  setAnswers(prev => {
    const current = Array.isArray(prev[stepIndex]) ? (prev[stepIndex] as string[]) : [];

    if (stepIndex === 6) {
      const enumValue = allergyLabelToEnum[option]; // converte para enum esperado pela API

      if (enumValue === "NONE") {
        // Se clicar em "Nenhuma", limpa as outras e deixa só ela
        return {
          ...prev,
          [stepIndex]: current.includes("NONE") ? [] : ["NONE"],
        };
      }

      // Se "Nenhuma" já está selecionada, não permite selecionar outra
      if (current.includes("NONE")) {
        return prev;
      }

      // Alterna a seleção do item
      const updated = current.includes(enumValue)
        ? current.filter(o => o !== enumValue)
        : [...current, enumValue];

      return {
        ...prev,
        [stepIndex]: updated,
      };
    }

    // Caso normal para múltiplas seleções (não alergias)
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

    setUserData(prev => {
    if (fieldParts.length === 1) {
  const fieldName = fieldParts[0] as keyof UserData;
  const prevValue = prev[fieldName] as string[] | undefined;

  if (Array.isArray(prevValue)) {
    const newValue = prevValue.includes(option)
      ? prevValue.filter(o => o !== option)
      : [...prevValue, option];

    return { ...prev, [fieldName]: newValue };
  } else {
    return { ...prev, [fieldName]: [option] };
  }
}


      // Campo aninhado, ex: diet.allergies
      const parentKey = fieldParts[0] as keyof UserData;
      const childKey = fieldParts[1];
      const prevParentValue = (prev[parentKey] as any) || {};

      if (stepIndex === 6) {
        // Para alergias usa enumValue
        const enumValue = allergyLabelToEnum[option];

        if (enumValue === "NONE") {
          const newValue = (prevParentValue[childKey] as string[])?.includes("NONE") ? [] : ["NONE"];
          return {
            ...prev,
            [parentKey]: {
              ...prevParentValue,
              [childKey]: newValue,
            },
          };
        }

        if ((prevParentValue[childKey] as string[])?.includes("NONE")) {
          return prev; // Não permite conflito com "NONE"
        }

        const current = (prevParentValue[childKey] as string[]) || [];
        const newValue = current.includes(enumValue)
          ? current.filter((o: string) => o !== enumValue)
          : [...current, enumValue];

        return {
          ...prev,
          [parentKey]: {
            ...prevParentValue,
            [childKey]: newValue,
          },
        };
      }

      // Para outros campos aninhados, lógica normal
      const current = (prevParentValue[childKey] as string[]) || [];
      const newValue = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option];

      return {
        ...prev,
        [parentKey]: {
          ...prevParentValue,
          [childKey]: newValue,
        },
      };
    });
  }
}

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
    const fieldPath = mapStepToField[stepIndex];
    const fieldParts = fieldPath.split(".");

    setUserData(prev => {
      if (fieldParts.length === 1) {
        const field = fieldParts[0];
        let value: any = option;

        if (field === "weight" || field === "height") {
          value = Number(option);
        } else if (field === "birthdate") {
          const parsed = new Date(option);
          value = !isNaN(parsed.getTime()) ? parsed.toISOString().split("T")[0] : "";
        }

        return {
          ...prev,
          [field]: value,
        };
      }

      const parentKey = fieldParts[0] as keyof UserData;
      const childKey = fieldParts[1];
      const parentValue = prev[parentKey] || {};

      const formatted = option
        .toUpperCase()
        .replace(/ /g, "_")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");

      return {
        ...prev,
        [parentKey]: {
          ...(parentValue as object),
          [childKey]: formatted,
        },
      };
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
