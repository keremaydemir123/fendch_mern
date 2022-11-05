import SERVER_URL from "./baseURL";
import axios from "axios";

export async function createComment({
  challengeId,
  message,
  parentId,
  userId,
}) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments`,
    { message, parentId, userId }
  );
  return response.data;
}

export async function updateComment({ challengeId, message, id }) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}`,
    { message }
  );
  return response.data;
}

export async function deleteComment({ challengeId, id }) {
  const response = await axios.delete(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}`
  );
  return response.data;
}

export async function toggleCommentLike({ id, challengeId }) {
  const response = await axios.post(
    `${SERVER_URL}/challenges/${challengeId}/comments/${id}/toggleLike`
  );
  return response.data;
}
