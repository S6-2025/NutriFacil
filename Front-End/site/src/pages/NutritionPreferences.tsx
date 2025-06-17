import React, { useEffect, useState } from "react";
import axios from "axios";

type NutritionData = {
  dietType: string;
  goal: string;
  allergies: string[];
  activityLevel: string;
};

const dietTypes = [
  { label: "Mediterrânea", value: "MEDITERRANEA" },
  { label: "Low Carb", value: "LOW_CARB" },
  { label: "Cetogênica", value: "CETOGENICA" },
  { label: "Vegetariana", value: "VEGETARIANA" },
];

const goals = [
  { label: "Emagrecimento", value: "EMAGRECIMENTO" },
  { label: "Hipertrofia", value: "HIPERTROFIA" },
];

const allergiesOptions = [
  { label: "Lactose", value: "LACTOSE" },
  { label: "Glúten", value: "GLUTEN" },
  { label: "Proteína do Leite", value: "PROTEINA_DO_LEITE" },
  { label: "Ovo", value: "OVO" },
  { label: "Frutos do Mar", value: "FRUTOS_DO_MAR" },
  { label: "Nenhuma", value: "NONE" },
];

const activityLevels = [
  { label: "Sedentário", value: "SEDENTARIO" },
  { label: "Leve", value: "LEVE" },
  { label: "Médio", value: "MEDIO" },
  { label: "Alto", value: "ALTO" },
];

const NutritionPreferences: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData>({
    dietType: "",
    goal: "",
    allergies: [],
    activityLevel: "",
  });

  function getUsernameFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub || null;
    } catch (e) {
      console.error("Erro ao decodificar token:", e);
      return null;
    }
  }

   
 useEffect(() => {
  const fetchPreferences = async () => {
    const token = sessionStorage.getItem("token");
    const username = getUsernameFromToken(token || "");

    if (!username) {
      console.error("Token inválido. Não foi possível extrair o username.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3030/user/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setNutritionData({
        dietType: data.diet?.type || "",
        goal: data.diet?.objective || "",
        activityLevel: data.diet?.physicalActivityStatus || "",
        allergies: data.allergies || [],
      });
    } catch (error) {
      console.error("Erro ao carregar dados nutricionais:", error);
    }
  };

  fetchPreferences();
}, []);


  const handleChange = (field: keyof NutritionData, value: any) => {
    setNutritionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAllergyToggle = (allergy: string) => {
    setNutritionData((prev) => {
      // Se o usuário clicar em "NONE", zera tudo e marca apenas "NONE"
      if (allergy === "NONE") {
        return {
          ...prev,
          allergies: ["NONE"],
        };
      }

      const isAlreadySelected = prev.allergies.includes(allergy);

      // Se "NONE" está marcado e o usuário marcou outra, removemos "NONE"
      const newAllergies = isAlreadySelected
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies.filter((a) => a !== "NONE"), allergy];

      return {
        ...prev,
        allergies: newAllergies,
      };
    });
  };

const handleEditClick = async () => {
  if (isEditing) {
    const token = sessionStorage.getItem("token");
    const username = getUsernameFromToken(token || "");

    if (!username) {
      console.error("Token inválido. Não foi possível extrair o username.");
      return;
    }

    try {
      const payload = {
        diet: {
          type: nutritionData.dietType,
          objective: nutritionData.goal,
          physicalActivityStatus: nutritionData.activityLevel,
        },
        allergies: nutritionData.allergies,
      };

      await axios.patch(`http://localhost:3030/user/${username}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dados atualizados com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  }

  setIsEditing((prev) => !prev);
};



  const renderSelectedLabel = (
    list: { label: string; value: string }[],
    selectedValue: string
  ) => {
    return list.find((item) => item.value === selectedValue)?.label || "-";
  };

  return (
    <main className="super-container">
      <div className="container-profile">
        <h1>Preferências Nutricionais</h1>

        {/* Tipo de Dieta */}
        <div className="form-section">
          <label>Tipo de dieta:</label>
          {isEditing ? (
            <select
              value={nutritionData.dietType}
              onChange={(e) => handleChange("dietType", e.target.value)}
            >
              <option value="">Selecione...</option>
              {dietTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          ) : (
            <p>{renderSelectedLabel(dietTypes, nutritionData.dietType)}</p>
          )}
        </div>

        {/* Objetivo */}
        <div className="form-section">
          <label>Objetivo:</label>
          {isEditing ? (
            <select
              value={nutritionData.goal}
              onChange={(e) => handleChange("goal", e.target.value)}
            >
              <option value="">Selecione...</option>
              {goals.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          ) : (
            <p>{renderSelectedLabel(goals, nutritionData.goal)}</p>
          )}
        </div>

        {/* Atividade Física */}
        <div className="form-section">
          <label>Nível de Atividade Física:</label>
          {isEditing ? (
            <select
              value={nutritionData.activityLevel}
              onChange={(e) => handleChange("activityLevel", e.target.value)}
            >
              <option value="">Selecione...</option>
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          ) : (
            <p>
              {renderSelectedLabel(activityLevels, nutritionData.activityLevel)}
            </p>
          )}
        </div>

        <div className="form-section" id="form-alergies">
          <label>Alergias:</label>
          {isEditing ? (
            <div className="allergy-buttons">
              {allergiesOptions.map((allergy) => {
                const isSelected = nutritionData.allergies.includes(
                  allergy.value
                );
                return (
                  <button
                    key={allergy.value}
                    type="button"
                    className={`allergy-button ${isSelected ? "selected" : ""}`}
                    onClick={() => handleAllergyToggle(allergy.value)}
                  >
                    {allergy.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <p>
              {nutritionData.allergies.length > 0
                ? allergiesOptions
                    .filter((a) => nutritionData.allergies.includes(a.value))
                    .map((a) => a.label)
                    .join(", ")
                : "Nenhuma"}
            </p>
          )}
        </div>

        {/* Botão */}
        <div className="button-wrapper">
          <button onClick={handleEditClick}>
            {isEditing ? "Salvar" : "Editar"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default NutritionPreferences;
