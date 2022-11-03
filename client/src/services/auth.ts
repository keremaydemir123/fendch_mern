import axios from 'axios';
import SERVER_URL from './utils';

export const getUser = async () => {
  const { data } = await axios.get(`${SERVER_URL}/auth/github/success`);
  return data;
};

export const logout = async () => {
  const { data } = await axios.get(`${SERVER_URL}/auth/github/logout`);
  return data;
};
