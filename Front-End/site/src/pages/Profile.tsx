import React, { useState, useEffect } from "react";
import axios from "axios";

type UserData = {
  fullname: string | null;
  gender: string | null;
  birthDate: string | null;
  phone: string | null;
  email: string | null;
  password: string | null;
  weight: string | null;
  height: string | null;
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    fullname: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: null,
    password: null,
    weight: null,
    height: null,
  });

  function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0]; // sempre garante YYYY-MM-DD
}

  function getUsernameFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Payload:", payload);
      return payload.sub || null;
    } catch {
      return null;
    }
  }

useEffect(() => {
  const fetchProfile = async () => {
    const token = sessionStorage.getItem("token");
    const username = getUsernameFromToken(token || "");

    if (!username) {
      console.error("Token inválido. Não foi possível extrair o username.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3030/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      setUserData({
        fullname: data.fullname || null,
        gender: data.gender || null,
        birthDate: formatDate(data.birthDate),
        phone: data.phone || null,
        email: data.email || null,
        password: null,
        weight: String(data.weight || null),
        height: String(data.height || null),
      });

    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  fetchProfile();
}, []);


  const handleChange = (field: keyof UserData, value: string) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleButtonClick = async () => {
    if (isEditing) {
      const token = sessionStorage.getItem("token");
      const username = getUsernameFromToken(token || "");
      console.log("USERDATA:", userData);
      try {
        await axios.patch(
          `http://localhost:3030/user/${username}`,
          {
            fullname: userData.fullname,
            password: userData.password,
            gender: userData.gender,
            birthdate: userData.birthDate,
            phone: userData.phone,
            email: userData.email,
            weight: Number(userData.weight),
            height: Number(userData.height),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );
        console.log("Dados atualizados com sucesso:", userData);
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
      }
    }

    setIsEditing((prev) => !prev);
  };

  return (
    <main className="super-container" id="super-container-form-profile">
      <div className="container-profile">
        <h1>Editar perfil</h1>

        <form className="form-personal">
          <div className="personal-camps">
            <label htmlFor="fullname-info">Nome:</label>
            <input
              type="text"
              id="fullname-info"
              disabled={!isEditing}
              value={userData.fullname ?? ""}
              onChange={(e) => handleChange("fullname", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="genre-info">Sexo:</label>
            <input
              type="text"
              id="genre-info"
              disabled={!isEditing}
              value={userData.gender ?? ""}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="birth-info">Data de nascimento:</label>
            <input
              type="date"
              id="birth-info"
              disabled={!isEditing}
              value={userData.birthDate ?? ""}
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="phone-info">Telefone:</label>
            <input
              type="text"
              id="phone-info"
              disabled={!isEditing}
              value={userData.phone ?? ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="weight-info">Peso (kg):</label>
            <input
              type="text"
              id="weight-info"
              disabled={!isEditing}
              value={userData.weight ?? ""}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="height-info">Altura (m):</label>
            <input
              type="text"
              id="height-info"
              disabled={!isEditing}
              value={userData.height ?? ""}
              onChange={(e) => handleChange("height", e.target.value)}
            />
          </div>

          <div className="info-camps">
            <label htmlFor="email-info">Email:</label>
            <input
              type="email"
              id="email-info"
              disabled={!isEditing}
              value={userData.email ?? ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="info-camps">
            <label htmlFor="password-info">Senha:</label>
            <input
              type="password"
              id="password-info"
              disabled={!isEditing}
              value={userData.password ?? ""}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        </form>

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
