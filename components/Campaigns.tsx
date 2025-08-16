"use client";

import Link from "next/link";
import { CampaignDemo } from "./CampaignDemo";


export function Camp() {
  return (
    <div>
        <div className="flex justify-between p-8">
            <h1 className="md:text-4xl text-2xl font-bold">Latest Fundraising Campaigns</h1>
            <Link href="" className="underline">See more</Link>
        </div>
      <CampaignDemo items={CAMPAIGN} />
    </div>
  )
}
const CAMPAIGN = [
    {
        id: 0,
        title: "Join Me To Impact 200 Lives Through Education All Around Lagos For The...",
        creator: "Pastor Mubarki",
        Target: 1000000,
        image: "https://static.mocortech.com/mexc-static-resource/image/direct_pc/1200_630-2.png",
        Tag: "Send children back to school",
    },
     {
        id: 1,
        title: "Join Me To Impact 200 Lives Through Education All Around Lagos For The...",
        creator: "Pastor Mubarki",
        Target: 1000000,
        image: "https://static.mocortech.com/mexc-static-resource/image/direct_pc/1200_630-2.png",
        Tag: "Send children back to school",
    },
     {
        id: 2,
        title: "Join Me To Impact 200 Lives Through Education All Around Lagos For The...",
        creator: "Pastor Mubarki",
        Target: 1000000,
        image: "https://static.mocortech.com/mexc-static-resource/image/direct_pc/1200_630-2.png",
        Tag: "Send children back to school",
    }
]

