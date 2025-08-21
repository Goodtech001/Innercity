"use client";

import { div } from "framer-motion/client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tag, TagIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress"
import * as React from "react"

type Campaign = {
  id: number;
  image: string;
  title: string;
  creator: string;
  Target: number;
  Tag: string;
};


export const CampaignDemo = ({items} : {
    items:Campaign[];
}) => {

    const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 500)
    return () => clearTimeout(timer)
  }, [])
    const [campaigns] = useState<Campaign[]>(items);
  return (
    <div className="flex p-4 justify-between gap-2 ">
    {campaigns.map((campaign) => {
        return(
            <div
            key={campaign.id}
            className="p-2 border-1 shadow-lg bg-white justify-between gap-2 rounded"
            >
                <Image src={campaign.image} alt="" width={500} height={700} className="rounded"/>
                <p className="font-bold">{campaign.title}</p>
                <p>Created by: <span className="text-[#0074E6] font-medium">{campaign.creator}</span></p>
                <Progress value={progress} className="w-[70%] mt-2" />
                <p>Target: <span className="text-[#0074E6] font-medium">${campaign.Target}</span></p>
                <Button className="py-4 px-8 bg-[#0074E6] mt-2">Donate Now.</Button>
                <p className="flex text-[#0074E6] gap-1 border-1 border-[#0074E6] h-7 w-65 rounded bg-white absolute top-195 ml-3"><Tag className="w-4 h-4 mt-1 ml-5"/> {campaign.Tag}</p>
                
            </div>
        )
    })}
    
      
    </div>
  )
}
