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

  async function handleSubmit(e: React.FormEvent, data: RegisterRequestDTO) {
    e.preventDefault();
    const token = await registerUser(data);
      sessionStorage.setItem('token', token);
      alert('Usuário registrado com sucesso.');
      navigate("/");

  }

 
  return { form, handleChange, handleSubmit };
}
