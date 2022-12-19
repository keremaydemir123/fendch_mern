import { ProjectProps } from './Project';

export type Repo = {
  name: string;
  html_url: string;
};

export type GithubRepoAPIResults = {
  private: boolean;
  name: string;
  html_url: string;
};

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
  bio?: string;
  linkedin?: string;
  job?: string;
  likedProjects: string[];
  followers: string[];
  following: string[];
  repos_url: string;
};
