import SERVER_URL from './baseURL';
import axios from 'axios';

export async function getNotifications(userId: string) {
  const response = await axios.get(`${SERVER_URL}/${userId}/notifications`);
  return response.data;
}
