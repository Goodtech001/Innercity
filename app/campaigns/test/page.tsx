/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from 'react';
// import FundraiseCampaignCard from './FundraiseCampaignCard';
// import { getAllCampaignsService } from '@/app/auth/auth.service';
import FundraiseCampaignCard from '@/components/fundraise-campaign-card';
import { getAllCampaignsService } from '@/app/auth/auth.service';

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const data = await getAllCampaignsService(); // implement this service similarly
        setCampaigns(data);
      } catch (e) {
        console.error('Failed to fetch campaigns', e);
      }
    }
    load();
  }, []);
  return (
    <div className="grid gap-4">
      heyyyy
      {campaigns.map(c => (
        <FundraiseCampaignCard key={c.id} campaign={c} />
      ))}
    </div>
  );
}
