import axios from 'axios';
import SERVER_URL from './baseURL';

export async function getUserByUsername(username: string) {
  const response = await axios.get(`${SERVER_URL}/users/username/${username}`);
  return response.data;
}

export async function updateMe({
  username,
  bio,
  linkedin,
  job,
}: {
  username: string;
  bio: string;
  linkedin: string;
  job: string;
}) {
  const response = await axios.patch(
    `${SERVER_URL}/users/username/${username}`,
    {
      bio,
      linkedin,
      job,
    }
  );
  return response.data;
}

export async function getUser(id: string) {
  const response = await axios.get(`${SERVER_URL}/users/${id}`);
  return response.data;
}

export async function getUsernames() {
  const response = await axios.get(`${SERVER_URL}/users/usernames`);
  return response.data;
}

export async function getRepos(link: string) {
  const response = await axios.get(link);
  return response.data;
}
