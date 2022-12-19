import axios from 'axios';
import SERVER_URL from './baseURL';

export const getUser = async () => {
  const { data } = await axios.get(`${SERVER_URL}/auth/login/success`, {
    withCredentials: true,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axios.get(`${SERVER_URL}/auth/login/logout`);
  return data;
};
