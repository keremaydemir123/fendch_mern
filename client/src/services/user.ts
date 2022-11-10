import axios from 'axios';
import SERVER_URL from './baseURL';

export async function getUserByUsername(username: string) {
  const response = await axios.get(`${SERVER_URL}/users/${username}`);
  return response.data;
}

export async function updateMe({
  username,
  bio,
}: {
  username: string;
  bio: string;
}) {
  const response = await axios.patch(`${SERVER_URL}/users/${username}`, {
    data: {
      bio,
    },
  });
  return response.data;
}
