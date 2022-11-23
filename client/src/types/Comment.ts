import { UserProps } from './User';

export type CommentProps = {
  _id: string;
  message: string;
  avatar: string;
  createdAt: string;
  username: string;
  likeCount: number;
  likes: string[];
  parentId: string;
  likedByMe: boolean;
};
