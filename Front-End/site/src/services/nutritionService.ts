import api from "./api";

export const getNutritionPreferences = async () => {
  const response = await api.get("/user/preferences");
  return response.data;
};

export const updateNutritionPreferences = async (data: any) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== "";
    })
  );

  const response = await api.patch("/user/preferences", filteredData);
  return response.data;
};
