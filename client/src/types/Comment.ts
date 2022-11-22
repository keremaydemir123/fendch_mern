import { UserProps } from './User';

export type CommentProps = {
  _id: string;
  message: string;
  createdAt: string;
  user: UserProps;
  likeCount: number;
  likedByMe: boolean;
  parentId: string;
};
