'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import VideoPlayer from '@/components/video-player'
import rita from '@/public/assets/images/hungry.jpg'
import man from '@/public/assets/images/food-7bmc.jpg'
import women from '@/public/assets/images/women-empowerment-gathering.jpg'
import men from '@/public/assets/images/community-development-construction.jpg'
import clss from '@/public/assets/images/education-class.jpg'

function ResourceCard() {
  const [showDrawer, setShowDrawer] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    username: '',
    location: '',
    bio: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [currentVideo, setCurrentVideo] = useState({
    src: 'https://vimeo.com/1037756541/2f13d91b44',
    thumb: rita,
  })

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = currentVideo.src
    a.download = '7-billion-meals.mp4' // Customize filename if needed
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const drawers = [
    {
      id: 1,
      name: '7 billion meals',
      img: man,
      src: 'https://player.vimeo.com/video/231560451',
    },
    {
      id: 2,
      name: '7 billion meals',
      img: rita,
      src: 'https://vimeo.com/1010215295/7c79867761',
    },
    {
      id: 3,
      name: '7 billion meals',
      img: women,
      src: 'https://player.vimeo.com/video/231560451',
    },
    {
      id: 4,
      name: '7 billion meals',
      img: men,
      src: 'https://vimeo.com/1037756541/2f13d91b44',
    },
    {
      id: 5,
      img: clss,
      name: '7 billion meals',
      src: 'https://player.vimeo.com/video/292941519',
    },
    {
      id: 6,
      img: man,
      name: '7 billion meals',
      src: 'https://player.vimeo.com/video/731472228/?h=709298ca1b',
    },
    {
      id: 7,
      img: clss,
      name: '7 billion meals',
      src: 'https://player.vimeo.com/video/731472228/?h=709298ca1b',
    },
    {
      id: 8,
      img: man,
      name: '7 billion meals',
      src: 'https://player.vimeo.com/video/731472228/?h=709298ca1b',
    },
    // ...
  ]

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 md:grid md:grid-cols-3 lg:grid-cols-4">
        {drawers.map((drawer) => (
          <div
            onClick={() => {
              setCurrentVideo({ src: drawer.src, thumb: drawer.img })
              setShowDrawer(true)
            }}
            key={drawer.id}
            className="flex aspect-1 w-full flex-col rounded-lg bg-gray-200 p-2 text-white backdrop-brightness-75"
            style={{
              backgroundImage: `linear-gradient(rgba(var(--dark), 0.2), rgba(var(--dark), 0.9 )), url(${typeof drawer.img === 'string' ? drawer.img : drawer.img.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Icon
              icon="material-symbols:download"
              width="22"
              height="22"
              className="mb-3 ml-auto"
            />
            <Icon
              icon="material-symbols:collections-bookmark-outline"
              width="22"
              height="22"
              className="ml-auto"
            />
            <div className="mr-auto mt-auto p-2 text-xs">
              <p>{drawer.name}</p>
            </div>
          </div>
        ))}

        {showDrawer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50">
            <button
              onClick={() => setShowDrawer(false)}
              className="absolute right-40 top-5 text-white"
            >
              <Icon icon="iconoir:cancel" width="30" height="30" />
            </button>
            <div className="border-color w-full max-w-[800px] items-center rounded-lg border-2 bg-white p-10 shadow-lg">
              <div className="mb-10 flex justify-between text-black">
                <h1 className="font-medium">7 billion meals</h1>
                <div className="ml-auto flex gap-5">
                  <Icon
                    icon="material-symbols:download"
                    width="24"
                    height="24"
                    className="mb-3 ml-auto"
                    onClick={handleDownload}
                  />
                  <Icon
                    icon="material-symbols:collections-bookmark-outline"
                    width="24"
                    height="24"
                    className="ml-auto"
                  />
                  <Icon icon="nrk:more" width="24" height="24" />
                </div>
                <div></div>
              </div>
              <VideoPlayer
                key={currentVideo.src}
                src={currentVideo.src}
                thumb={currentVideo.thumb}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ResourceCard
