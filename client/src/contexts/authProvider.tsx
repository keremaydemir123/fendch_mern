import React, { useState, createContext, useContext, useMemo } from 'react';

export interface Photo {
  value: string;
}

export interface Json {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company?: string;
  blog: string;
  location?: string;
  email?: string;
  hireable?: string;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  photos: Photo[];
  provider: string;
  _raw: string;
  _json: Json;
}

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={
        useMemo(() => ({ user, setUser }), [user, setUser]) as UserContextType
      }
    >
      {children}
    </UserContext.Provider>
  );
}
