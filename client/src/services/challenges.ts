import axios from 'axios';
import SERVER_URL from './baseURL';
import { ChallengeProps } from '../types/Challenge';

export async function getOldChallenges() {
  try {
    const response = await axios.get(`${SERVER_URL}/challenges/old`);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Couldn't get old challenges");
  }
}

export async function getOldChallengesNames() {
  try {
    const response = await axios.get(`${SERVER_URL}/challenges/old/names`);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Couldn't get old challenges");
  }
}

export async function getActiveChallenges() {
  try {
    const response = await axios.get(`${SERVER_URL}/challenges/active`);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Couldn't get active challenges");
  }
}

export async function getChallenge(id: string | undefined) {
  if (!id) throw new Error('No id provided');
  try {
    const response = await axios.get(`${SERVER_URL}/challenges/${id}`);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Couldn't get challenge");
  }
}

export async function updateChallenge(id: string, challenge: ChallengeProps) {
  try {
    const response = await axios.patch(
      `${SERVER_URL}/challenges/${id}`,
      challenge
    );
    return response.data;
  } catch (err: unknown) {
    throw new Error("Couldn't update challenge");
  }
}

export async function deleteChallenge(id: string) {
  try {
    const response = await axios.delete(`${SERVER_URL}/challenges/${id}`);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Couldn't delete challenge");
  }
}
