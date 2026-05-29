import { create } from 'axios';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8080/api';

export const api = create({
  baseURL: API_BASE_URL,
  timeout: 9000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.erro ||
      error.message ||
      'Nao foi possivel conectar com a API.';

    return Promise.reject(new Error(message));
  },
);
