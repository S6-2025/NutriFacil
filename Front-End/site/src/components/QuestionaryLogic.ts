export type StepType = 
  | { type: "image"; title: string; imageUrl: string }
  | { type: "single"; question: string; options: string[] }
  | { type: "multiple"; question: string; options: string[] }
  | { type: "description"; text: string; question: string; options: string[] };

export const steps: StepType[] = [
  { type: "image", title: "Welcome!", imageUrl: "/images/welcome.png" },
  { type: "description", text: "Choose your favorite fruit", question: "Fruits", options: ["Apple", "Banana", "Orange"] },
  { type: "single", question: "Pick one drink", options: ["Water", "Juice", "Soda"] },
  { type: "multiple", question: "Select your preferred meals", options: ["Rice", "Pasta", "Salad"] },
];

// Define uma estrutura para respostas
export type AnswersType = Record<number, string | string[]>;

export function handleSingleSelect(
  stepIndex: number,
  option: string,
  setAnswers: React.Dispatch<React.SetStateAction<AnswersType>>
): void {
  setAnswers((prev: AnswersType) => ({
    ...prev,
    [stepIndex]: option,
  }));
}

export function handleMultipleSelect(
  stepIndex: number,
  option: string,
  setAnswers: React.Dispatch<React.SetStateAction<AnswersType>>
): void {
  setAnswers((prev: AnswersType) => {
    const current = Array.isArray(prev[stepIndex]) ? (prev[stepIndex] as string[]) : [];
    return {
      ...prev,
      [stepIndex]: current.includes(option)
        ? current.filter((o: string) => o !== option)
        : [...current, option],
    };
  });
}
