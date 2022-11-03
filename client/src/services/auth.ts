import axios from 'axios';
import SERVER_URL from './utils';

console.log(SERVER_URL);

export const getUser = async () => {
  const { data } = await axios.get(`${SERVER_URL}/auth/login/success`, {
    withCredentials: true,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axios.get(`${SERVER_URL}/auth/github/logout`);
  return data;
};
