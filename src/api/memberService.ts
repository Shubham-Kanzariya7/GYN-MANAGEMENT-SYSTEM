import apiClient from './apiClient';

export async function fetchMembers() {
  const response = await apiClient.get('/members');
  return response.data;
}

export async function fetchMember(id) {
  const response = await apiClient.get(`/members/${id}`);
  return response.data;
}

export async function createMember(payload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (payload.photo) {
    formData.append('photo', payload.photo);
  }
  const response = await apiClient.post('/members', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function updateMember(id, payload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (payload.photo) {
    formData.append('photo', payload.photo);
  }
  const response = await apiClient.put(`/members/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function removeMember(id) {
  const response = await apiClient.delete(`/members/${id}`);
  return response.data;
}

export async function searchMembers(query) {
  const response = await apiClient.get(`/members/search?q=${encodeURIComponent(query)}`);
  return response.data;
}

export async function fetchExpiringMembers() {
  const response = await apiClient.get('/members/expiring');
  return response.data;
}
