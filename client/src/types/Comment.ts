export type CommentProps = {
  _id: string;
  message: string;
  avatar: string;
  createdAt: string;
  username: string;
  likes: string[];
  parentId?: string;
  likeCount?: number;
  isLikedByMe?: boolean;
};
