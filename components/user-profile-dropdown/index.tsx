import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useState } from 'react'
import blackProfilePicture from '@/public/assets/icons/blank-profile-picture.png'
import Link from 'next/link'

const userProfileList: TUserProfile[] = [
  {
    label: 'Profile',
    link: '/profile-page',
    icon: <Icon icon={'solar:user-bold'} className="h-6 w-6 text-2xl" />,
  },
  {
    label: 'Notification',
    link: '/notifications',
    icon: <Icon icon={'bxs:notification'} className="h-6 w-6 text-2xl" />,
  },
  {
    label: 'My Campaigns',
    link: '/my-campaigns',
    icon: <Icon icon={'ri:funds-fill'} className="h-6 w-6 text-2xl" />,
  },
  {
    label: 'Inbox',
    link: '/inbox',
    icon: <Icon icon={'material-symbols-light:chat'} className="h-6 w-6 text-2xl" />,
  },
]

type TUserProfile = {
  link: string
  label: string
  icon: React.JSX.Element
}

type TUserProfileDropdownProps = {
  direction?: 'left' | 'right'
  className?: string
}

export default function UserProfileDropdown({
  className,
  direction = 'right',
}: Readonly<TUserProfileDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative flex h-fit w-fit min-w-16 flex-col ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-10 inline-flex items-center gap-1 rounded-full px-1.5 py-1.5 text-center text-sm font-medium focus:outline-none focus:ring-2"
      >
        <Image
          className="rounded-full border border-textcolor/25"
          width={35}
          height={35}
          alt="blank-profile-picture"
          src={blackProfilePicture}
        />
        <Icon icon={'mynaui:chevron-down-solid'} className="h-4 w-4" />
      </button>
      {/*  */}

      <div
        className={`absolute -bottom-44 z-20 w-48 divide-y rounded shadow-sm ${isOpen ? 'block' : 'hidden'} ${direction == 'right' ? 'right-0' : 'left-0'}`}
      >
        <ul className="h-44 overflow-y-auto rounded-md border-2 bg-white p-2 py-1 pb-6 text-sm ring-2">
          {userProfileList.map((list) => (
            <Link href={list.link} key={list.label}>
              <button className="inline-flex w-full rounded px-4 py-2 text-sm hover:bg-ghost-white">
                <div className="inline-flex items-center gap-2">
                  {list.icon ? (
                    list.icon
                  ) : (
                    <Icon icon={'emojione-v1:flag-for-nigeria'} className="h-6 w-6 text-2xl" />
                  )}
                  <p>{list.label}</p>
                </div>
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
