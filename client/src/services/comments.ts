import SERVER_URL from './baseURL';
import axios from 'axios';

export async function createComment({
  challengeId,
  message,
  parentId,
  userId,
}: {
  challengeId: string;
  message: string;
  parentId: string;
  userId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments`,
    { message, parentId, userId }
  );
  return response.data;
}

export async function updateComment({
  challengeId,
  message,
  id,
}: {
  challengeId: string;
  message: string;
  id: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}`,
    { message }
  );
  return response.data;
}

export async function deleteComment({
  challengeId,
  id,
}: {
  challengeId: string;
  id: string;
}) {
  const response = await axios.delete(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}`
  );
  return response.data;
}

export async function toggleCommentLike({
  id,
  challengeId,
}: {
  id: string;
  challengeId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}/toggleLike`
  );
  return response.data;
}
