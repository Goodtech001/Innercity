/* eslint-disable @next/next/no-img-element */
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useState } from 'react'
import blackProfilePicture from '@/public/assets/icons/blank-profile-picture.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { postLogoutService } from '@/app/auth/auth.service'

const userProfileList: TUserProfile[] = [
  {
    label: 'Profile',
    link: '/profile?tab=profile',
    icon: <Icon icon={'solar:user-bold'} className="h-6 w-6 text-2xl" />,
  },
  {
    label: 'My Campaigns',
    link: '/profile?tab=campaigns',
    icon: <Icon icon={'ri:funds-fill'} className="h-6 w-6 text-2xl" />,
  },
  {
    label: 'Notification',
    link: '/profile?tab=notifications',
    icon: <Icon icon={'bxs:notification'} className="h-6 w-6 text-2xl" />,
  },
  {
    label: 'Chat',
    link: '/profile?tab=chat',
    icon: <Icon icon={'material-symbols-light:chat'} className="h-6 w-6 text-2xl" />,
  },
  {
    label: 'Admin',
    link: '/admin',
    icon: <Icon icon={'ri:admin-fill'} className="h-6 w-6 text-2xl" />,
  },
]

type TUserProfile = {
  link: string
  label: string
  icon: React.JSX.Element
}

type TUser = {
  avatar?: string
  photo?: string
  name?: string
  fullName?: string
  email?: string
}

type TUserProfileDropdownProps = {
  user: TUser | null
  mobile?: boolean
  direction?: 'left' | 'right'
  className?: string
}


export default function UserProfileDropdown({
  user,
  mobile,
  className,
  direction = 'right',
}: Readonly<TUserProfileDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await postLogoutService()

      // Extra safety
      sessionStorage.removeItem('course-training-profile')
      localStorage.removeItem('token')

      router.push('/')
      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className={`relative flex h-fit w-fit min-w-16 flex-col ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-10 inline-flex items-center gap-1 rounded-full px-1.5 py-1.5 text-center text-sm font-medium"
      >
       <img
          src={user?.avatar || user?.photo || '/avatar.png'}
          alt="profile"
          className={`rounded-full object-cover ${
            mobile ? 'h-10 w-10' : 'h-9 w-9'
          }`}
        />
        <Icon icon={'mynaui:chevron-down-solid'} className="h-4 w-4" />

        <span className="font-medium hidden sm:block">
          {user?.name || user?.fullName || 'User'}
        </span>
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
          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="inline-flex w-full rounded px-4 py-2 text-sm text-red-500 hover:bg-ghost-white"
            >
              <div className="inline-flex items-center gap-2">
                <Icon icon={'solar:logout-bold'} className="h-6 w-6 text-2xl" />
                <p>Logout</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
