import React, { useState } from "react";
import ProfileForm from "../components/ProfileForm";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "João da Silva",
    genre: "Masculino",
    birthDate: "1995-06-15",
    telephone: "(11) 99999-9999",
    email: "joao@email.com",
    password: "********",
    weight: "70",
    height: "1.70",
  });

  const handleChange = (field: keyof typeof userData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleButtonClick = () => {
    if (isEditing) {
      // Aqui você pode chamar a função de salvar no backend futuramente
      console.log("Dados salvos:", userData);
      setIsEditing(false); // Sai do modo edição
    } else {
      setIsEditing(true); // Entra no modo edição
    }
  };

  return (
    <main className="super-container" id="super-container-form-profile">
      <div className="container-profile">
        <h1>Editar perfil</h1>

        <section className="personal-info">
          <ProfileForm
            userData={userData}
            isEditing={isEditing}
            onChange={handleChange}
          />
        </section>

        <section className="button-wrapper">
          <button type="button" onClick={handleButtonClick}>
            {isEditing ? "Salvar" : "Editar"}
          </button>
        </section>
      </div>
    </main>
  );
};

export default Profile;
