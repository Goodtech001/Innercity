import { GlobeIcon, LeafIcon, TimerIcon } from "lucide-react"
import Link from "next/link"

function Body() {
  return (
    <div className="flex justify-between px-10 py-2 bg-[#C8974D]">
        <div className="flex space-x-1 text-white">
            <GlobeIcon />
            <Link href="/" className="underline">Join a Global Network of Changemakers</Link>
        </div>
        <div className="flex space-x-1 text-white">
            <LeafIcon />
            <Link href="/" className="underline">Give Every Month (G.E.M)</Link>
        </div>
        <div className="flex space-x-1 text-white">
            <TimerIcon />
            <Link href="/" className="underline">Track Your Impact in Real Time</Link>
        </div>
    </div>
  )
}

export default Body