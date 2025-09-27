// import { Icon } from '@iconify/react'
// import dummyNotifications from '@/json/dummy-notifications.json'
// import { useModal } from '../modal/useModal'
// import Modal from '@/components/modal'

// type Props = {
//   handleCheckboxChange: (id: string) => void
//   notification: (typeof dummyNotifications)[0]
// }

// export default function NotificationCard({ handleCheckboxChange, notification }: Props) {
//   const renderIconByType = (type: string) => {
//     switch (type) {
//       case 'info':
//         return 'ic:round-info'
//       case 'alert':
//         return 'ic:round-warning'
//       case 'message':
//         return 'ic:round-message'
//       case 'celebration':
//         return 'material-symbols:celebration-rounded'
//       case 'birthday':
//         return 'mingcute:cake-fill'
//       default:
//         return 'ic:round-notifications'
//     }
//   }

//   return (
//     <div
//       key={notification.id}
//       className={`border-color flex rounded border-2 p-2 ${notification.checked ? 'border-blue-500' : 'border-color'} ${notification.isRead ? 'bg-blue-100' : ''}`}
//     >
//       <div className="flex items-center justify-center border-r border-textcolor/75 px-1 text-primary md:px-2">
//         <Icon icon={renderIconByType(notification.type)} className="text-2xl md:text-3xl" />
//       </div>

//       <div className="flex w-full flex-col gap-1.5 px-3">
//         <h4 className="text-base font-semibold capitalize text-primary">{notification.title}</h4>
//         <p className="ellipsis-2 text-sm !leading-tight">{notification.description}</p>
//         <small className="font-semibold text-primary">{notification.date}</small>
//       </div>

//       <div className="flex flex-col items-center justify-between">
//         <button className="btn p-0.5">
//           <Icon icon={'mingcute:more-2-line'} className="text-2xl" />
//         </button>
//         <input
//           type="checkbox"
//           checked={notification.checked}
//           onChange={() => handleCheckboxChange(String(notification.id))}
//           className="rounded-sm border-2 border-primary"
//         />
//       </div>
//     </div>
//   )
// }



import { Icon } from '@iconify/react'
import dummyNotifications from '@/json/dummy-notifications.json'
import { useModal } from '../modal/useModal'
import Modal from '@/components/modal'
import { useState } from 'react'

// 🔁 Utility to get icon by type
const getIconByType = (type: string) => {
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

const getColorByType = (type: string) => {
  switch (type) {
    case 'info':
      return 'text-blue-500'
    case 'alert':
      return 'text-red-500'
    case 'message':
      return 'text-gray-500'
    case 'celebration':
      return 'text-purple-500'
    case 'birthday':
      return 'text-pink-500'
    default:
      return 'text-primary'
  }
}

type Props = {
  handleCheckboxChange: (id: string) => void
  notification: (typeof dummyNotifications)[0]
}

export default function NotificationCard({ handleCheckboxChange, notification }: Props) {
  const { isModalClosed, openModal, closeModal } = useModal()
  const [selectedNotification, setSelectedNotification] = useState<typeof notification | null>(null)

  const handleOpen = () => {
    setSelectedNotification(notification)
    openModal()
  }

  
  const iconClass = getColorByType(notification.type)

  return (
    <>
      {/* 📩 Notification Card */}
      <div
        key={notification.id}
        onClick={handleOpen}
        className={`cursor-pointer border-color flex rounded border-2 p-2 transition hover:shadow-md ${
          notification.checked ? 'border-blue-500' : 'border-color'
        } ${notification.isRead ? 'bg-blue-100' : ''}`}
      >
        <div className="flex items-center justify-center border-r border-textcolor/75 px-1 text-primary md:px-2">
          <Icon icon={getIconByType(notification.type)} className={`text-2xl md:text-3xl ${iconClass}`} />
        </div>

        <div className="flex w-full flex-col gap-1.5 px-3">
          <h4 className="text-base font-semibold capitalize text-primary">{notification.title}</h4>
          <p className="ellipsis-2 text-sm !leading-tight">{notification.description}</p>
          <small className="font-semibold text-primary">{notification.date}</small>
        </div>

        <div className="flex flex-col items-center justify-between">
          <button className="btn p-0.5" onClick={(e) => e.stopPropagation()}>
            <Icon icon={'mingcute:more-2-line'} className="text-2xl" />
          </button>
          <input
            type="checkbox"
            checked={notification.checked}
            onChange={() => handleCheckboxChange(String(notification.id))}
            className="rounded-sm border-2 border-primary"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* 🔍 Modal for Full View */}
      {selectedNotification && (
        <Modal
          className="max-w-xl w-full transition-all duration-300 overflow-hidden"
          closeModal={closeModal}
          isModalClosed={isModalClosed}
        >
          <button
            onClick={closeModal}
             className="absolute right-4 top-4 z-50 rounded-lg border border-gray-300 bg-transparent p-1.5 text-dark shadow-sm transition"
          >
            <Icon icon="iconoir:cancel" className="h-6 w-6 md:h-7 md:w-7 text-white" />
          </button>

          <div className={`mt-10 flex flex-col md:flex-row bg-white rounded-lg border-l-4 px-4 py-6 ${
            selectedNotification.type === 'alert'
              ? 'border-red-500'
              : selectedNotification.type === 'info'
              ? 'border-blue-500'
              : 'border-yellow-500'
          }`}>
            <div className="flex items-start justify-center pr-4">
              <Icon icon={getIconByType(notification.type)} className={`text-2xl md:text-3xl ${iconClass}`} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2 text-dark">
                {selectedNotification.title}
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                {selectedNotification.description}
              </p>
              <span className="text-xs text-gray-500 font-medium">
                {selectedNotification.date}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

