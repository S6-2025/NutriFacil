import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6b89-2804-1b3-c483-ecf8-f44f-e396-96f3-31f5.ngrok-free.app', // coloque a URL real da sua API
});

export default api;
