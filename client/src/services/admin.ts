import axios from 'axios';
import { ChallengeProps } from '../types/Challenge';
import SERVER_URL from './baseURL';

export async function createChallenge(challenge: ChallengeProps) {
  const response = await axios.post(`${SERVER_URL}/challenges`, challenge);
  return response.data;
}

export async function getSecretChallenges() {
  const response = await axios.get(`${SERVER_URL}/challenges/secret`);
  return response.data;
}

export async function getUsers() {
  const response = await axios.get(`${SERVER_URL}/users`);
  return response.data;
}
