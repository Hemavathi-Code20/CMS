import axios from 'axios';

const API_URL = 'http://localhost:5000/api/maintenance';

export const createMaintenance = (data) => {
  return axios.post(API_URL, data);
};

export const getAllMaintenance = (filters) => {
  return axios.get(API_URL, { params: filters });
};

export const getMaintenanceById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateMaintenance = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteMaintenance = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
