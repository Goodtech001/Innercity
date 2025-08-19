'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import PercentageBar from '@/components/percentage-bar'
import { formatTime } from '@/utils/format-time'

export default function VideoPlayer() {
  const playerRef = useRef<HTMLVideoElement>(null)

  const [playing, setPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(true)
  const [progress, setProgress] = useState(0) // 0–1 fraction
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    setPlaying((prev) => !prev)
    console.log(progress)
  }

  // Update progress as video plays
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const el = e.target as HTMLVideoElement
    setDuration(el.duration)
    if (el && el.duration > 0) {
      setProgress(el.currentTime / el.duration)
      // console.log(progress)
    }
  }

  const handleUpdatePlayerCurrentTime = (percentage: number) => {
    if (!duration || !playerRef.current) return

    // convert percentage (0–100) into seconds
    const newTime = (percentage / 100) * duration

    // update the progress as well with percentage to fraction
    setProgress(percentage / 100)

    console.log('Jumping to:', newTime, 'seconds')

    playerRef.current.currentTime = newTime
  }

  const handleVideoEnded = () => {
    setPlaying(false)
    setDuration(0)
    setProgress(0)
  }

  // Seek when slider moves
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSeek = (e: any) => {
    const newProgress = parseFloat(e.target.value)
    setProgress(newProgress)

    console.log(playerRef?.current?.currentTime)
    console.dir({ v: playerRef.current })
    console.log(Object.keys(playerRef.current || {}))
    console.log(Object.getOwnPropertyNames(playerRef.current || {}))
    console.log(Object.getPrototypeOf(playerRef.current))
  }

  return (
    <>
      <div className="relative aspect-[1.5] w-full max-w-3xl overflow-hidden rounded-lg bg-black backdrop-filter md:aspect-[1.8]">
        {/* Video */}
        <ReactPlayer
          ref={playerRef}
          src="https://vimeo.com/76979871"
          // src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          playing={playing}
          controls={false} // hide native controls
          width="100%"
          height="100%"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => handleVideoEnded}
          style={{ pointerEvents: 'none' }} // prevent click-through to Vimeo UI
          slot="media"
        />

        {/* controls overlay */}
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`absolute inset-0 bg-gradient-to-b from-dark/5 to-dark/95 text-light transition duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            onClick={togglePlay}
            className="absolute inset-0 bottom-16 flex items-center justify-center"
          >
            <button className="btn-primary w-fit px-5 py-1">
              {playing ? (
                <Icon icon="mdi:pause" className="size-9 text-4xl" />
              ) : (
                <Icon icon="mdi:play" className="size-9 text-4xl" />
              )}
            </button>
          </div>

          <div className="absolute bottom-0 h-16 w-full">
            <div className="mx-auto h-12 rounded-lg bg-white/30 px-2 py-2 backdrop-blur-sm md:w-11/12">
              <PercentageBar
                value={progress * 100}
                onChange={(val) => {
                  setProgress(val)
                  handleUpdatePlayerCurrentTime(val)
                }}
              />
              <div className="flex items-center justify-between gap-8 text-sm">
                <small>
                  {duration
                    ? `${formatTime(progress * duration)} / ${formatTime(duration)}`
                    : '00:00 / 00:00'}
                </small>

                <div className="">
                  <span className="text-xs text-gray-400">
                    <Icon icon="mdi:volume-high" className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
