// types/Campaign.ts
export interface Campaign {
  id: number;
  title: string;
  description: string;
  organizer: string;
  target: number;
  user: string;
  category: string;
  createdAt: Date;
  banner: string;
}
