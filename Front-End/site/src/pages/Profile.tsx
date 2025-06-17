import React, { useState, useEffect } from "react";
import axios from "axios";

type UserData = {
  fullname: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  weight: string;
  height: string;
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    fullname: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
    weight: "",
    height: "",
  });

  function getUsernameFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub || null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
          if (!token) {
          console.error("Usuário não autenticado.");
          return;
        }
      const username = getUsernameFromToken(token);
     if (!username) {
          console.error("Não foi possível extrair o username do token.");
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
          fullname: data.fullname || "",
          gender: data.gender || "",
          birthDate: data.birthdate || "",
          phone: data.phone || "",
          email: data.email || "",
          password: "***",
          weight: String(data.weight || ""),
          height: String(data.height || ""),
        });

        console.log(data);
      } catch (error) {
        
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleButtonClick = async () => {
    if (isEditing) {
      const token = sessionStorage.getItem("token");
      const username = getUsernameFromToken(token || "");

      try {
        await axios.patch(
          `http://localhost:3030/user/${username}`,
          {
            fullname: userData.fullname,
            gender: userData.gender,
            birthdate: userData.birthDate,
            phone: userData.phone,
            email: userData.email,
            weight: Number(userData.weight),
            height: Number(userData.height),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
              value={userData.fullname}
              onChange={(e) => handleChange("fullname", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="genre-info">Sexo:</label>
            <input
              type="text"
              id="genre-info"
              disabled={!isEditing}
              value={userData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="birth-info">Data de nascimento:</label>
            <input
              type="date"
              id="birth-info"
              disabled={!isEditing}
              value={userData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="phone-info">Telefone:</label>
            <input
              type="text"
              id="phone-info"
              disabled={!isEditing}
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="weight-info">Peso (kg):</label>
            <input
              type="text"
              id="weight-info"
              disabled={!isEditing}
              value={userData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>

          <div className="personal-camps">
            <label htmlFor="height-info">Altura (m):</label>
            <input
              type="text"
              id="height-info"
              disabled={!isEditing}
              value={userData.height}
              onChange={(e) => handleChange("height", e.target.value)}
            />
          </div>

          <div className="info-camps">
            <label htmlFor="email-info">Email:</label>
            <input
              type="email"
              id="email-info"
              disabled={!isEditing}
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="info-camps">
            <label htmlFor="password-info">Senha:</label>
            <input
              type="password"
              id="password-info"
              disabled={!isEditing}
              value={userData.password}
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
