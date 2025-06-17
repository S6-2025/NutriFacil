import { useState } from "react";
import axios from "axios";

export const useUserLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent, data: { username: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", data);

      if (response.status === 200 && response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        // Tudo certo
      } else {
        // Algo deu errado (login inválido, token ausente etc.)
        throw new Error("Login inválido");
      }
    } catch (error: any) {
      // Trata erros da API (ex: 401 Unauthorized)
      if (error.response && error.response.status === 401) {
        throw new Error("Usuário ou senha incorretos");
      } else {
        throw new Error("Erro ao conectar ao servidor");
      }
    }
  };

  return {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  };
};
