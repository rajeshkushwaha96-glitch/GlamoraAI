import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../src/lib/supabase';

interface User {
  email: string;
  userId: string;
  isPremium: boolean;
  credits?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, isPremium: boolean, userId: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  upgradeToPremium: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchSupabaseUser = async (email: string, userId: string, isPremium: boolean) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code === 'PGRST116') {
        // User not found, create one
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([{ id: userId, email, credits: 5, is_premium: isPremium }])
          .select()
          .single();
        
        if (createError) console.error('Error creating supabase user:', createError);
        return newUser;
      } else if (data) {
        return data;
      }
    } catch (e) {
      console.error('Supabase error:', e);
    }
    return null;
  };

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
      // Sync credits on load
      refreshUser();
    }
  }, []);

  const refreshUser = async () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    const { email, userId, isPremium } = JSON.parse(currentUser);
    
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (data) {
      const updatedUser = { 
        email, 
        userId, 
        isPremium: data.is_premium ?? isPremium, 
        credits: data.credits 
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const login = async (email: string, isPremium: boolean, userId: string) => {
    const dbUser = await fetchSupabaseUser(email, userId, isPremium);
    const userData = { 
      email, 
      isPremium: dbUser?.is_premium ?? isPremium, 
      userId, 
      credits: dbUser?.credits ?? 5 
    };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('userId', userId);
    // Sync premium status to the local library helper as well
    if (userData.isPremium) {
      const { setPremiumStatus } = await import('../src/lib/premium');
      setPremiumStatus(true);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const upgradeToPremium = async () => {
    if (!user) return;
    const { email, userId } = user;
    
    // Update Supabase
    const { error } = await supabase
      .from('users')
      .update({ is_premium: true })
      .eq('id', userId);
    
    if (error) console.error('Error upgrading to premium:', error);

    // Update local state
    const userData = { ...user, isPremium: true };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    // Also update lib/premium
    import('../src/lib/premium').then(({ setPremiumStatus }) => setPremiumStatus(true));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, refreshUser, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
