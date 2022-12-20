import axios from 'axios';
import SERVER_URL from './baseURL';

export async function getNotifications(username: string | undefined) {
  const response = await axios.get(
    `${SERVER_URL}/users/${username}/notifications`
  );
  return response.data;
}

export async function deleteNotification({
  userId,
  notificationId,
}: {
  userId: string;
  notificationId: string;
}) {
  const response = await axios.delete(
    `${SERVER_URL}/users/${userId}/notifications/${notificationId}`
  );
  return response.data;
}
