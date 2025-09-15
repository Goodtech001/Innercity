'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import VideoPlayer from '@/components/video-player'
import rita from '@/public/assets/images/hungry.jpg'
import man from '@/public/assets/images/food-7bmc.jpg'
import women from '@/public/assets/images/women-empowerment-gathering.jpg'
import men from '@/public/assets/images/community-development-construction.jpg'
import clss from '@/public/assets/images/education-class.jpg'
import { GetResourcesServiceResponse } from '@/services/resources.service'
import { useModal } from '../modal/useModal'
import Modal from '../modal'

function ResourceCard({ asset }: { asset: GetResourcesServiceResponse }) {
  const { closeModal, isModalClosed, openModal } = useModal()
  const [currentVideo, setCurrentVideo] = useState({
    src: 'https://vimeo.com/1037756541/2f13d91b44',
    thumb: rita,
  })

  console.log(asset)

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
      {drawers.map((drawer) => (
        <div
          onClick={() => {
            setCurrentVideo({ src: drawer.src, thumb: drawer.img })
            openModal()
          }}
          key={drawer.id}
          className="flex aspect-1 w-full cursor-pointer flex-col rounded-lg bg-gray-200 p-2 text-white backdrop-brightness-75"
          style={{
            backgroundImage: `linear-gradient(rgba(var(--dark), 0.2), rgba(var(--dark), 0.9 )), url(${typeof drawer.img === 'string' ? drawer.img : drawer.img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Icon icon="material-symbols:download" width="22" height="22" className="mb-3 ml-auto" />
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

      <Modal
        className="w-full overflow-hidden border-4 border-blue-500 md:max-w-4xl"
        closeModal={closeModal}
        isModalClosed={isModalClosed}
      >
        <button
          onClick={closeModal}
          className="absolute right-4 top-10 block rounded-lg border border-light/25 p-1.5 text-light"
        >
          <Icon icon="iconoir:cancel" className="size-6 md:size-8" />
        </button>

        <div className="my-auto rounded-lg border-4 border-red-500 bg-light px-2 py-4 md:px-4">
          <div className="mb-8 flex items-center justify-between">
            <h5 className="text-lg font-bold text-dark md:text-xl">7 billion meals</h5>

            <div className="ml-auto flex gap-5">
              <Icon
                icon="material-symbols:download"
                className="btn size-8 cursor-pointer p-1"
                onClick={handleDownload}
              />
              <Icon
                icon="material-symbols:collections-bookmark-outline"
                className="btn size-8 cursor-pointer p-1"
              />
            </div>
          </div>

          <VideoPlayer
            className="max-w-4xl"
            key={currentVideo.src}
            src={currentVideo.src}
            thumb={currentVideo.thumb}
          />

          <hr className="my-8" />

          <div className="">
            <h5 className="text-lg font-bold text-dark md:text-xl">More Videos like this</h5>

            <div className="">
              <div className="mt-10 flex flex-col items-center justify-center gap-3 overflow-y-auto rounded py-2 pb-10 md:grid md:grid-cols-3 lg:grid-cols-4">
                {/* <ResourceCard asset={asset} /> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* {showDrawer && (
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
            <VideoPlayer key={currentVideo.src} src={currentVideo.src} thumb={currentVideo.thumb} />
          </div>
        </div>
      )} */}
    </>
  )
}

export default ResourceCard
