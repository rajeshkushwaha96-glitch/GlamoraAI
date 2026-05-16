import { checkUserPremium } from './premium';

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
    const res = await fetch("/api/usage/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    return true;
  } catch (err) {
    console.error("Error checking usage:", err);
    return true;
  }
};

export const increaseUsage = async (): Promise<void> => {
  const userId = getUserId();
  if (!userId) return;

  try {
    await fetch("/api/usage/increment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
  } catch (err) {
    console.error("Error incrementing usage:", err);
  }
};

export const getUsageLeft = async (): Promise<number> => {
  if (checkUserPremium()) return 5;
  
  const userId = getUserId();
  if (!userId) return 0;

  try {
    const res = await fetch("/api/usage/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    return data.usageLeft;
  } catch (err) {
    console.error("Error getting usage left:", err);
    return 0;
  }
};
