import api from './api';
import type { RegisterRequestDTO } from '../types/RegisterRequestDTO';

export async function registerUser(data: RegisterRequestDTO) {
  const response = await api.post('/auth/register', data);
  return response.data;
}
