import { useState } from 'react';
import type { RegisterRequestDTO } from '../types/RegisterRequestDTO';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export function useRegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterRequestDTO>({
    username: '',
    password: '',
    fullname: '',
    email: '',
    gender: '',
    birthdate: new Date(),
    weight: 0,
    height: 0,
    allergies: [],
    diet: {
      objective: '',
      type: '',
      physicalActivityStatus: '',
    }
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['age', 'weight', 'height'].includes(name)
        ? Number(value)
        : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent, data: RegisterRequestDTO) {
    e.preventDefault();

    try {
      const response = await registerUser(data); // pode lançar erro
      const token = response.token;

      if (!token || typeof token !== 'string') {
        throw new Error('Token inválido ou ausente');
      }

      sessionStorage.setItem('token', token);
      alert('Usuário registrado com sucesso.');
      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert('Erro ao registrar usuário. Verifique os dados e tente novamente.');
      return; // impede navegação e execução
    }
  }

  return { form, handleChange, handleSubmit };
}
