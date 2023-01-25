import axios from 'axios';
import SERVER_URL from './baseURL';

export async function createProject({
  git,
  challengeId,
  userId,
  markdown,
  tags,
}: {
  git: string;
  challengeId: string;
  userId: string;
  markdown: string;
  tags: string[];
}) {
  const response = await axios.post(
    `${SERVER_URL}/projects/challenges/${challengeId}/projects`,
    { git, markdown, userId, tags }
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

export async function getProject(id: string | undefined) {
  const response = await axios.get(`${SERVER_URL}/projects/${id}`);
  return response.data;
}

export async function likeProject({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  const response = await axios.patch(
    `${SERVER_URL}/projects/${projectId}/like`,
    { userId }
  );
  return response.data;
}

export async function dislikeProject({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  const response = await axios.patch(
    `${SERVER_URL}/projects/${projectId}/dislike`,
    { userId }
  );
  return response.data;
}

export async function updateProjectMarkdown({
  projectId,
  markdown,
}: {
  projectId: string;
  markdown: string;
}) {
  const response = await axios.patch(
    `${SERVER_URL}/projects/${projectId}/updateMarkdown`,
    { markdown }
  );
  return response.data;
}

export async function deleteProject(projectId: string) {
  const response = await axios.delete(`${SERVER_URL}/projects/${projectId}`);
  return response.data;
}
