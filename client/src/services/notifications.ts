import SERVER_URL from './baseURL';
import axios from 'axios';

export async function getNotifications(userId: string) {
  const response = await axios.get(
    `${SERVER_URL}/users/${userId}/notifications`
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
