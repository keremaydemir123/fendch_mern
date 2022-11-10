import SERVER_URL from './baseURL';
import axios from 'axios';

export async function createProject({
  git,
  challengeId,
  userId,
  description,
}: {
  git: string;
  challengeId: string;
  userId: string;
  description: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/projects`,
    { git, description, userId }
  );
  return response.data;
}

export async function getProjects() {
  const response = await axios.get(`${SERVER_URL}/projects`);
  return response.data;
}

export async function getProjectsByUsername(username: string) {
  const response = await axios.get(`${SERVER_URL}/projects/${username}`);
  return response.data;
}

export async function getProject(id: string) {
  const response = await axios.get(`${SERVER_URL}/projects/${id}`);
  return response.data;
}
