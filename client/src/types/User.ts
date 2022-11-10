export type UserProps = {
  _id?: string;
  githubId?: string;
  username?: string;
  avatar: string;
  profileUrl: string;
  role: 'user' | 'admin';
  challenges: string[];
  projects: string[];
  bio: string;
};
