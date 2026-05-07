
export enum ToolCategory {
  ALL = 'All',
  BEAUTY = 'Beauty',
  BACKGROUND = 'Background',
  RETOUCH = 'Retouch',
  ARTISTIC = 'Artistic',
  ENHANCE = 'Enhance',
  PORTRAIT = 'Portrait',
  UTILITY = 'Utility',
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  iconName: string; // Mapping to Lucide icon name
  promptTemplate: string; // Template for the AI prompt
  badge?: string;
  popularityScore?: number; // 0 to 100
  createdAt?: string; // ISO Date string for "Date Added" sort
}

export enum UserPlan {
  FREE = 'Free',
  PREMIUM = 'Premium',
}

export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  avatarUrl: string;
  plan: UserPlan;
  dailyDownloadCount: number;
  dailyEditCount: number;
  lastDownloadDate: string; // ISO string to reset daily count
}

export interface EditHistoryItem {
  id: string;
  toolName: string;
  thumbnailUrl: string;
  date: string;
}
