import { CommentProps } from './Comment';

export type ChallengeProps = {
  _id?: string;
  isActive?: boolean;
  tech: string;
  description: string;
  tags: string[];
  tasksMd: string;
  week: number;
  projects: string[];
  startDate?: string;
  objective: string;
  liveExample: string;
  comments?: CommentProps[];
  solutionMd: string;
  thumbnail: string;
  tasksVideo: string;
  solutionVideo: string;
} | null;
