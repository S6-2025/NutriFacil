import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030/auth/', // coloque a URL real da sua API
});

export default api;
