import { ChallengeProps } from './Challenge';
import { CommentProps } from './Comment';
import { UserProps } from './User';

export type ProjectProps = {
  user: UserProps;
  challenge: ChallengeProps;
  _id?: string;
  git: string;
  description: string;
  submittedAt: Date;
  likes: string[];
  comments: CommentProps[];
};
