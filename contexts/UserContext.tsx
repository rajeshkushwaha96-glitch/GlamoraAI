import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUsageLeft, increaseUsage } from '../src/lib/usage';

interface UserContextType {
  user: any;
  usageLeft: number;
  upgradeToPremium: () => Promise<void>;
  incrementEditCount: () => Promise<void>;
  refreshCredits: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, upgradeToPremium: authUpgrade, isAuthenticated, refreshUser } = useAuth();
  const [usageLeft, setUsageLeft] = useState<number>(5);

  const refreshCredits = async () => {
    if (isAuthenticated) {
      const left = await getUsageLeft();
      setUsageLeft(left);
    }
  };

  useEffect(() => {
    refreshCredits();
  }, [isAuthenticated, user?.credits]);

  const incrementEditCount = async () => {
    await increaseUsage();
    await refreshCredits();
    await refreshUser();
  };

  const upgradeToPremium = async () => {
    await authUpgrade();
    await refreshCredits();
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      usageLeft, 
      upgradeToPremium, 
      incrementEditCount,
      refreshCredits
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
