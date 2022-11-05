import axios from 'axios';
import SERVER_URL from './baseURL';

type ChallengeProps = {
  tech: string;
  description: string;
  todos: string[];
  tags: string[];
};

export async function createChallenge({
  tech,
  description,
  todos,
  tags,
}: ChallengeProps) {
  const response = await axios.post(`${SERVER_URL}/challenges`, {
    tech,
    description,
    todos,
    tags,
  });
  return response.data;
}

export async function getSecretChallenges() {
  const response = await axios.get(`${SERVER_URL}/challenges/secret`);
  return response.data;
}
