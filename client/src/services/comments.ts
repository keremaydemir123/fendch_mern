import SERVER_URL from './baseURL';
import axios from 'axios';

export async function getCommentsByChallengeId(challengeId: string) {
  const response = await axios.get(
    `${SERVER_URL}/challenges/${challengeId}/comments`
  );
  return response.data;
}

export async function createComment({
  challengeId,
  message,
  parentId = 'null',
  userId,
}: {
  challengeId: string;
  message: string;
  parentId?: string;
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
  const response = await axios.patch(
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

export async function likeComment({
  id,
  challengeId,
  userId,
}: {
  id: string;
  challengeId: string;
  userId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}/like`,
    { userId }
  );
  return response.data;
}

export async function dislikeComment({
  id,
  challengeId,
  userId,
}: {
  id: string;
  challengeId: string;
  userId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}/like`,
    { userId }
  );
  return response.data;
}

export async function replyComment({
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
    `${SERVER_URL}/challenges/${challengeId}/comments/${parentId}/reply`,
    { message, userId, parentId }
  );
  return response.data;
}
