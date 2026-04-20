/* eslint-disable @typescript-eslint/no-explicit-any */
// types/Campaign.ts
export interface Campaign {
  impactMetric: string
  id: number
  title: string
  excerpt?: string
  goal: number
  raised?: number
  period?: string
  campaign_image?: string
  ecard_image?: string
  thumbnail_large?: string
  banner_id?:string

  user?: {
    id: number
    fullname: string
    avatar: string
    created_at:string
    location:string
  }

  category?: {
    id: number
    name: string
  }
  banner?: {
    id: number;
    url:string;
  }
  thumbnail?:{
    id: number;
    url:string;
  }

  donor_count?: number
}
