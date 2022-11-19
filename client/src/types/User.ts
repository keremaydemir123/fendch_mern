import { ProjectProps } from './Project';

export type UserProps = {
  _id?: string;
  githubId?: string;
  username?: string;
  avatar: string;
  profileUrl: string;
  role: 'user' | 'admin';
  challenges: string[];
  comments: string[];
  likes: string[];
  projects: ProjectProps[];
  bio: string;
  likedProjects: string[];
  linkedin: string;
};
