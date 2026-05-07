
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserPlan } from '../types';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  incrementDownloadCount: () => void;
  incrementEditCount: () => void;
  resetDownloadCount: () => void;
  upgradeToPremium: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('glamora_user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return {
      id: 'guest_123',
      name: 'Guest User',
      email: 'guest@example.com',
      credits: 10,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
      plan: UserPlan.FREE,
      dailyDownloadCount: 0,
      dailyEditCount: 0,
      lastDownloadDate: new Date().toISOString(),
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('glamora_user', JSON.stringify(user));
    }
  }, [user]);

  const incrementDownloadCount = () => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      dailyDownloadCount: prev.dailyDownloadCount + 1
    } : null);
  };

  const incrementEditCount = () => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      dailyEditCount: prev.dailyEditCount + 1
    } : null);
  };

  const resetDownloadCount = () => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      dailyDownloadCount: 0,
      dailyEditCount: 0
    } : null);
  };

  const upgradeToPremium = () => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      plan: UserPlan.PREMIUM
    } : null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, incrementDownloadCount, incrementEditCount, resetDownloadCount, upgradeToPremium }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
