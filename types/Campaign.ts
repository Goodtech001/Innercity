// types/Campaign.ts
export interface Campaign {
  raised: any;
  goal: any;
  image: string | Blob | undefined;
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
