import SERVER_URL from './baseURL';
import axios from 'axios';

export async function getChallenges() {
  try {
    const response = await axios.get(`${SERVER_URL}/challenges`);
    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getChallenge(id: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/challenges/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function deleteChallenge(id: string) {
  try {
    const response = await axios.delete(`${SERVER_URL}/challenges/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
}
