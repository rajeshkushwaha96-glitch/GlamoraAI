import { checkUserPremium } from './premium';
import { supabase } from './supabase';

const getUserId = (): string | null => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (user?.userId) return user.userId;
  return localStorage.getItem("userId");
};

export const canUseFeature = async (): Promise<boolean> => {
  if (checkUserPremium()) return true;

  const userId = getUserId();
  if (!userId) return false;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching credits:', error);
      return false;
    }
    
    return data && data.credits > 0;
  } catch (err) {
    console.error("Error checking usage:", err);
    return false;
  }
};

export const increaseUsage = async (): Promise<void> => {
  const userId = getUserId();
  if (!userId) return;

  if (checkUserPremium()) return;

  try {
    const { error } = await supabase.rpc('use_credit', { user_id: userId });
    if (error) throw error;
  } catch (err) {
    console.error("Error decrementing credits:", err);
  }
};

export const getUsageLeft = async (): Promise<number> => {
  if (checkUserPremium()) return 5;
  
  const userId = getUserId();
  if (!userId) return 0;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (error) return 0;
    return data?.credits ?? 0;
  } catch (err) {
    console.error("Error getting credits:", err);
    return 0;
  }
};
