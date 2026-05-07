export const getPremiumStatus = (): boolean => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) return false;
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: any) => u.userId === currentUser.userId);
  return user ? user.isPremium : false;
};

export const checkUserPremium = (): boolean => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  return user?.isPremium === true;
};

export const setPremiumStatus = (status: boolean): void => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) return;
  
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((u: any) => u.userId === currentUser.userId);
  
  if (userIndex !== -1) {
    users[userIndex].isPremium = status;
    localStorage.setItem("users", JSON.stringify(users));
    
    currentUser.isPremium = status;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
};

export const checkPremiumAccess = (): boolean => {
  if (!checkUserPremium()) {
    alert("Upgrade to Premium to use this feature");
    return false;
  }
  return true;
};
