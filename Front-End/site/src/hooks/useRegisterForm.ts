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
    const response = await registerUser(data);
    sessionStorage.setItem('token', response.token);
    alert('Usuário registrado com sucesso.');
    navigate("/");
  }


  return { form, handleChange, handleSubmit };
}
