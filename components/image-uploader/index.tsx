"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useState } from "react";
// import ima from "@/public/assets/images/education-class.jpg";

function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target?.files?.[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  setImage(imageUrl);
};

const placeholderImage = '/assets/images/video-thumbnail.jpg'; // Change to your actual path


  return (
      <div className="relative w-full  h-[150px] overflow-hidden rounded-lg shadow-md">
      {/* Next.js Image with fixed height and full width */}
      <div className="w-full h-full relative ">
        <Image
          src={image || placeholderImage}
          alt="Preview"
          width={400}
          height={100}
          className="w-full h-full object-cover rounded-lg brightness-75"
        />
      </div>

       {/* Dark gradient overlay on bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none rounded-b-lg" />

      {/* Camera icon in top-right corner */}
      <label
        htmlFor="file-upload"
        className="absolute top-2 right-2 bg-white p-2 rounded-xl shadow-xl cursor-pointer hover:bg-gray-100 transition border border-primary"
      >
        <Icon icon="mdi:camera" width="24" height="24" className="text-primary"/>
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}

export default ImageUploader;
