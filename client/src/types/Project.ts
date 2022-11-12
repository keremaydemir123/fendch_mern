import { ChallengeProps } from './Challenge';
import { UserProps } from './User';

export type ProjectProps = {
  user: UserProps;
  challenge: ChallengeProps;
  _id?: string;
  git: string;
  description: string;
  submittedAt: Date;
};
