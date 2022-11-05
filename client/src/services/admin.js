import axios from "axios";
import SERVER_URL from "./baseURL";

export async function createChallenge({ tech, taskSummary, todos }) {
  const response = await axios.post(`${SERVER_URL}/challenges`, {
    tech,
    taskSummary,
    todos,
  });
  return response.data;
}
