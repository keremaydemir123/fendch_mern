import axios from 'axios';
import SERVER_URL from './baseURL';

export async function getCommentsByChallengeId(challengeId: string) {
  const response = await axios.get(
    `${SERVER_URL}/challenges/${challengeId}/comments`
  );
  return response.data;
}

export async function getCommentsByProjectId(projectId: string) {
  const response = await axios.get(
    `${SERVER_URL}/projects/${projectId}/comments`
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
  console.log('challengeId', challengeId);
  console.log('id', id);
  console.log('userId', userId);

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
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}/dislike`,
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

// comments for projects
export async function createProjectComment({
  projectId,
  message,
  parentId = 'null',
  userId,
}: {
  projectId: string;
  message: string;
  parentId?: string;
  userId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/projects/${projectId}/comments`,
    { message, parentId, userId }
  );
  return response.data;
}

export async function updateProjectComment({
  projectId,
  message,
  id,
}: {
  projectId: string;
  message: string;
  id: string;
}) {
  const response = await axios.patch(
    `${SERVER_URL}/projects/${projectId}/comments/${id}`,
    { message }
  );
  return response.data;
}

export async function deleteProjectComment({
  projectId,
  id,
}: {
  projectId: string;
  id: string;
}) {
  const response = await axios.delete(
    `${SERVER_URL}/projects/${projectId}/comments/${id}`
  );
  return response.data;
}

export async function likeProjectComment({
  id,
  projectId,
  userId,
}: {
  id: string;
  projectId: string;
  userId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/projects/${projectId}/comments/${id}/like`,
    { userId }
  );
  return response.data;
}

export async function dislikeProjectComment({
  id,
  projectId,
  userId,
}: {
  id: string;
  projectId: string;
  userId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/projects/${projectId}/comments/${id}/dislike`,
    { userId }
  );
  return response.data;
}

export async function replyProjectComment({
  projectId,
  message,
  parentId,
  userId,
}: {
  projectId: string;
  message: string;
  parentId: string;
  userId: string;
}) {
  const response = await axios.post(
    `${SERVER_URL}/projects/${projectId}/comments/${parentId}/reply`,
    { message, userId, parentId }
  );
  return response.data;
}
