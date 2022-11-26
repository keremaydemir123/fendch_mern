import axios from 'axios';
import SERVER_URL from './baseURL';

export async function followUser({
  followerId,
  username,
}: {
  followerId: string;
  username: string;
}) {
  const response = await axios.post(`${SERVER_URL}/users/${username}/follow`, {
    followerId,
  });
  return response.data;
}

export async function unfollowUser({
  followerId,
  username,
}: {
  followerId: string;
  username: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/users/${username}/unfollow`,
    {
      followerId,
    }
  );
  return response.data;
}
