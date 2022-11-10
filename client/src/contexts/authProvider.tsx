import React, { useState, createContext, useContext, useMemo } from 'react';
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
