import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });


export const inventoryApi = {
  getAll: () => API.get('/inventory'),
  getOne: (id) => API.get(`/inventory/${id}`),
  create: (formData) => API.post('/register', formData),
  updateText: (id, data) => API.put(`/inventory/${id}`, data),
  updatePhoto: (id, formData) => API.put(`/inventory/${id}/photo`, formData),
  delete: (id) => API.delete(`/inventory/${id}`)
};