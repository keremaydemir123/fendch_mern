import React, { useState, createContext, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import io from 'socket.io-client';
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

  const socket = io('127.0.0.1:4000', {
    reconnectionDelay: 1000,
    reconnection: true,
    transports: ['websocket', 'polling', 'flashsocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  useQuery('getUser', getUser, {
    onSuccess: (data: UserProps) => {
      setUser(data);
      socket.emit('connect_user', data._id);
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
