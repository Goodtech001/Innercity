"use client";
import Body from "@/components/Body";
import Campaign2 from "@/components/campaign2";
import { Camp } from "@/components/Campaigns";
import Category from "@/components/Category";
import CornerTitle from "@/components/CornerTitle";
import Gem from "@/components/Gem";
import Hero from "@/components/Hero";
import Par from "@/components/par";
import { CarouselDemo } from "@/components/PartnersCorner";
import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";
import "./globals.css";
import TopNavbar from "@/topnavbar";

export default function Home() {
  return (
    <div>
      <TopNavbar />
      <Hero />
      <Body />
      <Camp />
      <Category />
      <Gem />
      <CarouselDemo />
      <Analytics />
      <Campaign2 />
    </div>
  );
}
