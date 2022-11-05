import SERVER_URL from "./baseURL";
import axios from "axios";

export async function createProject({ git, challengeId, userId }) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/projects`,
    { git, userId }
  );
  return response.data;
}

export async function getProjects() {
  const response = await axios.get(`${SERVER_URL}/projects`);
  return response.data;
}

export async function getProject(id) {
  const response = await axios.get(`${SERVER_URL}/projects/${id}`);
  return response.data;
}
