import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  userId: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, isPremium: boolean, userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
    }
  }, []);

  const login = (email: string, isPremium: boolean, userId: string) => {
    const userData = { email, isPremium, userId };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
