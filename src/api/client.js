// src/api/client.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token from localStorage if exists
client.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('huerto-user');
    if (raw) {
      const user = JSON.parse(raw);
      if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));

// Global response handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try { localStorage.removeItem('huerto-user'); } catch (e) {}
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
