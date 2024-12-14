import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ocr-project-v2gi.onrender.com',
  withCredentials: true, 
});

export const createUser = (data) => api.post('/users/create', data);
export const loginUser = (data) => api.post('/users/login', data);
export const getAllUsers = () => api.get('/users');

export const getAllFile = () => api.get('/files/all');
export const uploadFile = (data) => api.post('/files/upload', data);
export const menuFileAdd = (data) => api.post('/menu/add', data);