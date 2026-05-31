import apiClient from './apiClient';

export async function login(email, password) {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
}

export function saveAuthData(data) {
  localStorage.setItem('gym_access_token', data.token);
  localStorage.setItem('gym_user', JSON.stringify({ id: data.id, fullName: data.fullName, email: data.email, role: data.role }));
}

export function clearAuthData() {
  localStorage.removeItem('gym_access_token');
  localStorage.removeItem('gym_user');
}

export function getAuthUser() {
  const stored = localStorage.getItem('gym_user');
  return stored ? JSON.parse(stored) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem('gym_access_token');
}
