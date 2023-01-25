import React, { useState, createContext, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getUser } from '../services/auth';
import { UserProps } from '../types/User';

type UserContextType = {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);

  useQuery('getUser', getUser, {
    onSuccess: (data: UserProps) => {
      setUser(data);
    },
  });

  return (
    <UserContext.Provider
      value={useMemo(() => ({ user }), [user]) as UserContextType}
    >
      {children}
    </UserContext.Provider>
  );
}
