import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  email: string;
  ecoPoints: number;
  setEcoPoints: (pts: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext not provided');
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [ecoPoints, setEcoPoints] = useState(0);
  const email = 'user@example.com';

  return (
    <UserContext.Provider value={{ email, ecoPoints, setEcoPoints }}>
      {children}
    </UserContext.Provider>
  );
};