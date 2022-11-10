import React, { useState, createContext, useContext, useMemo } from 'react';

type Project = {
  _id: string;
  name: string;
};

export interface User {
  githubId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  avatar: string;
  bio?: string;
  role: 'user' | 'admin';
  projects: Project[];
  joinedAt: Date;
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
