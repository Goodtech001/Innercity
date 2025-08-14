import Body from "@/components/Body";
import { Camp } from "@/components/Campaigns";
import Category from "@/components/Category";
import CornerTitle from "@/components/CornerTitle";
import Gem from "@/components/Gem";
import Hero from "@/components/Hero";
import Par from "@/components/par";
import { CarouselDemo } from "@/components/PartnersCorner";
import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Hero />
     <Body />
     <Camp />
     <Category/>
     <Gem />
     <CarouselDemo />
     <Analytics/>
    </div>
  );
}
