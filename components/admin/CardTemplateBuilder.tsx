/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Rnd } from "react-rnd"
import { useState } from "react"
import Image from "next/image"

export default function CardTemplateBuilder({ templateImage, onChange }: any) {

  const [avatarBox, setAvatarBox] = useState({
    x: 100,
    y: 100,
    width: 120,
    height: 120
  })

  const [textBox, setTextBox] = useState({
    x: 200,
    y: 350
  })

  const updateValues = (newAvatar:any, newText:any) => {

    onChange({
      holeX: Math.round(newAvatar.x),
      holeY: Math.round(newAvatar.y),
      holeWidth: Math.round(newAvatar.width),
      holeHeight: Math.round(newAvatar.height),
      excerptX: Math.round(newText.x),
      excerptY: Math.round(newText.y)
    })
  }

  return (

    <div className="relative w-[600px] border rounded overflow-hidden">

      {/* TEMPLATE IMAGE */}

      <Image
        src={templateImage}
        width={600}
        height={400}
        alt="template"
        className="w-full"
      />

      {/* AVATAR HOLE */}

      <Rnd
        size={{
          width: avatarBox.width,
          height: avatarBox.height
        }}
        position={{
          x: avatarBox.x,
          y: avatarBox.y
        }}
        bounds="parent"
        onDragStop={(e,d)=>{
          const newBox = {...avatarBox, x:d.x, y:d.y}
          setAvatarBox(newBox)
          updateValues(newBox, textBox)
        }}
        onResizeStop={(e,dir,ref,delta,pos)=>{

          const newBox = {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            x: pos.x,
            y: pos.y
          }

          setAvatarBox(newBox)
          updateValues(newBox, textBox)
        }}
      >

        <div className="w-full h-full border-2 border-red-500 rounded-full flex items-center justify-center text-xs text-red-500 bg-red-200/20">
          Avatar
        </div>

      </Rnd>

      {/* TEXT POSITION */}

      <Rnd
        size={{ width: 200, height: 60 }}
        position={{
          x: textBox.x,
          y: textBox.y
        }}
        enableResizing={false}
        bounds="parent"
        onDragStop={(e,d)=>{

          const newText = {x:d.x,y:d.y}

          setTextBox(newText)

          updateValues(avatarBox,newText)
        }}
      >

        <div className="border border-blue-500 bg-blue-100/40 text-blue-700 text-xs p-1">
          Campaign Text
        </div>

      </Rnd>

    </div>
  )
}