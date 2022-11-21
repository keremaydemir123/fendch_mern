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
    `${SERVER_URL}/projects/challenges/${challengeId}/projects`,
    { git, description, userId }
  );
  return response.data;
}

export async function getProjects(queryString: string) {
  const response = await axios.get(`${SERVER_URL}/projects?${queryString}`);
  return response.data;
}

export async function getProjectsByUserId(userId: string) {
  const response = await axios.get(
    `${SERVER_URL}/projects/getProjectByUserId/${userId}`
  );
  return response.data;
}

export async function getProject(id: string) {
  const response = await axios.get(`${SERVER_URL}/projects/${id}`);
  return response.data;
}
