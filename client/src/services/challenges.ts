import axios from 'axios';
import SERVER_URL from './baseURL';
import { ChallengeProps } from '../types/Challenge';

export async function getOldChallenges() {
  try {
    const response = await axios.get(`${SERVER_URL}/challenges/old`);
    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getActiveChallenges() {
  try {
    const response = await axios.get(`${SERVER_URL}/challenges/active`);
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

export async function updateChallenge(id: string, challenge: ChallengeProps) {
  try {
    const response = await axios.patch(
      `${SERVER_URL}/challenges/${id}`,
      challenge
    );
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
