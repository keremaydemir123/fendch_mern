import axios from 'axios';
import SERVER_URL from './baseURL';

type ChallengeProps = {
  tech: string;
  description: string;
  tags: string[];
  tasks: string[];
};

export async function createChallenge({
  tech,
  description,
  tasks,
  tags,
}: ChallengeProps) {
  const response = await axios.post(`${SERVER_URL}/challenges`, {
    tech,
    description,
    tasks,
    tags,
  });
  return response.data;
}

export async function getSecretChallenges() {
  const response = await axios.get(`${SERVER_URL}/challenges/secret`);
  return response.data;
}
