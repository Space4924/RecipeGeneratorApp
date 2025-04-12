import React, { createContext, useContext, useState,ReactNode } from 'react';
interface AuthContextType {
  valid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [valid, setValid] = useState(false);

  return (
    <AuthContext.Provider value={{ valid, setValid }}>
      {children}
    </AuthContext.Provider>
  );
};
