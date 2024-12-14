import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ocr-project-v2gi.onrender.com', // URL do seu back-end NestJS
});

export const createUser = (data) => api.post('/users/create', data);
export const loginUser = (data) => api.post('/users/login', data);
export const getAllUsers = () => api.get('/users');