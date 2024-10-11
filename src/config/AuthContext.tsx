/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { checkAuthStatus } from './firebase';
import { Spinner } from '@nextui-org/react';

// Define a type for the user object and the context
interface UserType {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus(setUser, setLoading);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};