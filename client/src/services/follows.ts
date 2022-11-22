import axios from 'axios';
import SERVER_URL from './baseURL';

export async function toggleFollow({
  followerId,
  followeeId,
}: {
  followerId: string;
  followeeId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/users/${followeeId}/follow`,
    {
      followerId,
    }
  );
  return response.data;
}
