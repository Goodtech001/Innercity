import { Icon } from '@iconify/react'
import dummyNotifications from '@/json/dummy-notifications.json'

type Props = {
  handleCheckboxChange: (id: string) => void
  notification: (typeof dummyNotifications)[0]
}

export default function NotificationCard({ handleCheckboxChange, notification }: Props) {
  const renderIconByType = (type: string) => {
    switch (type) {
      case 'info':
        return 'ic:round-info'
      case 'alert':
        return 'ic:round-warning'
      case 'message':
        return 'ic:round-message'
      case 'celebration':
        return 'material-symbols:celebration-rounded'
      case 'birthday':
        return 'mingcute:cake-fill'
      default:
        return 'ic:round-notifications'
    }
  }

  return (
    <div
      key={notification.id}
      className={`border-color flex rounded border-2 p-2 ${notification.checked ? 'border-blue-500' : 'border-color'} ${notification.isRead ? 'bg-blue-100' : ''}`}
    >
      <div className="flex items-center justify-center border-r border-textcolor/75 px-1 text-primary md:px-2">
        <Icon icon={renderIconByType(notification.type)} className="text-2xl md:text-3xl" />
      </div>

      <div className="flex w-full flex-col gap-1.5 px-3">
        <h4 className="text-base font-semibold capitalize text-primary">{notification.title}</h4>
        <p className="ellipsis-2 text-sm !leading-tight">{notification.description}</p>
        <small className="font-semibold text-primary">{notification.date}</small>
      </div>

      <div className="flex flex-col items-center justify-between">
        <button className="btn p-0.5">
          <Icon icon={'mingcute:more-2-line'} className="text-2xl" />
        </button>
        <input
          type="checkbox"
          checked={notification.checked}
          onChange={() => handleCheckboxChange(String(notification.id))}
          className="rounded-sm border-2 border-primary"
        />
      </div>
    </div>
  )
}
