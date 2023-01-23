import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.get(endpoint, body);
  return data;
};

export const requestSignUp = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
