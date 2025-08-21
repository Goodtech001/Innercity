"use client";

import Carousel from "@/components/ui/carousel";
import CornerTitle from "./CornerTitle";
export function CarouselDemo() {
  const slideData = [
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      location: "Lagos, Nigeria",
      donation: 50,
      donated:2.5,
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      location: "Lagos, Nigeria",
      donation: 50,
      donated:2.5,
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      location:"Lagos, Nigeria",
      donation:50,
      donated:2.5,
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      location: "Lagos, Nigeria",
      donation:50,
      donated:2.5,
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
        <CornerTitle />
      <Carousel slides={slideData} />
    </div>
  );
}
