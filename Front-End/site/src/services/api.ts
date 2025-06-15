import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true
});

// Interceptor para adicionar token em requisições autenticadas
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // ou onde você guarda o token

  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default api;
