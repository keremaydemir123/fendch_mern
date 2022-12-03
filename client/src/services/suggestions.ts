import axios from 'axios';
import SERVER_URL from './baseURL';

export async function sendSuggestion(suggestion: string) {
  const response = await axios.post(`${SERVER_URL}/suggestions`, {
    suggestion,
  });
  return response.data;
}

export async function getSuggestions() {
  const response = await axios.get(`${SERVER_URL}/suggestions`);
  return response.data;
}
