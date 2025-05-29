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
    age: 0,
    weight: 0,
    height: 0,
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = await registerUser(form);
      sessionStorage.setItem('token', token);
      alert('Usuário registrado com sucesso.');
      navigate("/");
    } catch (err) {
      alert('Erro ao registrar usuário.');
    }
  }

 
  return { form, handleChange, handleSubmit };
}
