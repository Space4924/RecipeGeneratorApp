import React, { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  valid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  userToken: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  valid: false,
  setValid: () => {},
  userToken: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [valid,setValid]=useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token: string) => {
    setUserToken(token);
    await AsyncStorage.setItem('jwtToken', token);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ userToken, loading, login, logout,valid,setValid }}>
      {children}
    </AuthContext.Provider>
  );
};
