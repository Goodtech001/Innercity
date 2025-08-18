import React, { useRef, useState } from 'react'

export default function TopFundraisersVideo() {
  return (
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <h3 className="mx-auto max-w-3xl text-center text-3xl font-bold text-dark md:text-4xl">
          Top Fundraisers Share Their Stories and Reasons Behind Major Campaigns
        </h3>

        <CustomVideoPlayer />
      </div>
    </section>
  )
}

import ReactPlayer from 'react-player'

export function CustomVideoPlayer() {
  const playerRef = useRef<HTMLVideoElement | undefined>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => setPlaying(!playing)

  const handleProgress = (state: unknown) => {
    // setProgress(state.played)
    console.log(state)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setProgress(newTime)
    console.log(e)
    console.log(playerRef)

    // playerRef.current?.seekTo(newTime)
  }

  return (
    <div className="relative mx-auto aspect-2 w-full max-w-3xl overflow-hidden rounded-xl shadow-xl">
      {/* Video */}
      <ReactPlayer
        ref={playerRef as React.Ref<HTMLVideoElement> | undefined}
        src="https://player.vimeo.com/video/1037756541/?h=2f13d91b44"
        playing={playing}
        width="100%"
        height="100%"
        controls={false}
        onProgress={handleProgress}
      />

      {/* Center Play Button */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30"
        >
          <div className="bg-blue-500 rounded-full p-4 shadow-lg">
            <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Controls */}
      <div className="absolute bottom-2 left-0 right-0 px-4">
        <input
          type="range"
          min={0}
          max={1}
          step="0.01"
          value={progress}
          onChange={handleSeek}
          className="w-full cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  )
}
