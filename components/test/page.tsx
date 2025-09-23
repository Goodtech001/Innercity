// 'use client'
// import { Icon } from '@iconify/react/dist/iconify.js'
// import React, { useState } from 'react'

// function Mynotification() {
//   const [checkedBoxes, setCheckedBoxes] = useState({
//     checkbox1: false,
//     checkbox2: false,
//     checkbox3: false,
//     checkbox4: false,
//   })

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleChange = (e: { target: { name: any; checked: any } }) => {
//     setCheckedBoxes((prevCheckedBoxes) => ({
//       ...prevCheckedBoxes,
//       [e.target.name]: e.target.checked,
//     }))
//   }
//   const isAnyChecked = Object.values(checkedBoxes).some((checked) => checked)
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between border-b">
//         <div className="mt-3 flex gap-2 md:mt-1">
//           <input type="checkbox" className="mt-1 rounded-sm border border-primary" />
//           <p>Select All</p>
//         </div>
//         <div className="mb-2 flex gap-3">
//           <button className="btn-primary rounded-full px-4 py-1">All</button>
//           <button className="btn-white rounded-full px-4 py-1">Unread</button>
//         </div>
//       </div>
//       {isAnyChecked && (
//         <div className="flex gap-3">
//           <div className="flex space-x-1 truncate rounded border border-transparent bg-red-100 px-3 py-1 text-red-500">
//             <Icon icon="material-symbols:delete" width="24" height="24" />
//             <p className="">Delete selected</p>
//           </div>
//           <div className="flex space-x-1 truncate rounded border border-transparent bg-blue-100 px-3 py-1 text-primary">
//             <Icon icon="solar:check-read-bold" width="24" height="24" />
//             <p>Mark As Read</p>
//           </div>
//         </div>
//       )}
//       <div
//         className={`border-color flex rounded border-2 p-2 ${
//           checkedBoxes.checkbox1 ? 'border-blue-500' : 'border-color'
//         }`}
//       >
//         <div className="flex items-center justify-center px-2 text-primary">
//           <Icon icon="material-symbols:star-outline" width="34" height="34" />
//         </div>
//         <div className="gap-3 space-x-3 border-l border-textcolor">
//           <div className="flex md:w-[158%] justify-between">
//             <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
//             <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
//           </div>
//           <p className="line-clamp-2 text-sm">
//             James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
//             This means more visibility for your cause...
//           </p>
//           <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
//             <small>4 April 2025</small>
//             <input
//               type="checkbox"
//               name="checkbox1"
//               checked={checkedBoxes.checkbox1}
//               onChange={handleChange}
//               className="rounded-sm border-2 border-primary"
//             />
//           </span>
//         </div>
//       </div>

//       {/*  */}

//       <div
//         className={`border-color flex rounded border-2 bg-blue-100 p-2 ${
//           checkedBoxes.checkbox2 ? 'border-blue-500' : 'border-color'
//         }`}
//       >
//         <div className="flex items-center justify-center px-2 text-primary">
//           <Icon icon="material-symbols:star-outline" width="34" height="34" />
//         </div>
//         <div className="gap-3 space-x-3 border-l border-textcolor">
//           <div className="flex md:w-[158%] justify-between">
//             <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
//             <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
//           </div>
//           <p className="line-clamp-2 text-sm">
//             James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
//             This means more visibility for your cause...
//           </p>
//           <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
//             <small>4 April 2025</small>
//             <input
//               type="checkbox"
//               name="checkbox2"
//               checked={checkedBoxes.checkbox2}
//               onChange={handleChange}
//               className="rounded-sm border-2 border-primary"
//             />
//           </span>
//         </div>
//       </div>

//       {/*  */}

//       <div
//         className={`border-color flex rounded border-2 p-2 ${
//           checkedBoxes.checkbox3 ? 'border-blue-500' : 'border-color'
//         }`}
//       >
//         <div className="flex items-center justify-center px-2 text-primary">
//           <Icon icon="material-symbols:star-outline" width="34" height="34" />
//         </div>
//         <div className="gap-3 space-x-3 border-l border-textcolor">
//           <div className="flex md:w-[158%] justify-between">
//             <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
//             <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
//           </div>
//           <p className="line-clamp-2 text-sm">
//             James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
//             This means more visibility for your cause...
//           </p>
//           <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
//             <small>4 April 2025</small>
//             <input
//               type="checkbox"
//               name="checkbox3"
//               checked={checkedBoxes.checkbox3}
//               onChange={handleChange}
//               className="rounded-sm border-2 border-primary"
//             />
//           </span>
//         </div>
//       </div>

//       {/*  */}

//       <div
//         className={`border-color flex rounded border-2 bg-blue-100 p-2 ${
//           checkedBoxes.checkbox4 ? 'border-blue-500' : 'border-color'
//         }`}
//       >
//         <div className="flex items-center justify-center px-2 text-primary">
//           <Icon icon="material-symbols:celebration" width="34" height="34" />
//         </div>
//         <div className="gap-3 space-x-3 border-l border-textcolor">
//           <div className="flex md:w-[158%] justify-between">
//             <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
//             <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
//           </div>
//           <p className="line-clamp-2 text-sm">
//             James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
//             This means more visibility for your cause...
//           </p>
//           <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
//             <small>4 April 2025</small>
//             <input
//               type="checkbox"
//               name="checkbox4"
//               checked={checkedBoxes.checkbox4}
//               onChange={handleChange}
//               className="rounded-sm border-2 border-primary"
//             />
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Mynotification

'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

const initialNotifications = [
  {
    id: 'checkbox1',
    title: 'New supporter alert!',
    description:
      'James added your fundraiser “Clean Water for Lagos” to his favourites. This means more visibility for your cause...',
    date: '4 April 2025',
    icon: 'material-symbols:star-outline',
    isRead: false,
  },
  {
    id: 'checkbox2',
    title: 'New supporter alert!',
    description:
      'James added your fundraiser “Clean Water for Lagos” to his favourites. This means more visibility for your cause...',
    date: '4 April 2025',
    icon: 'material-symbols:star-outline',
    isRead: true,
  },
  {
    id: 'checkbox3',
    title: 'New supporter alert!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolores delectus aspernatur temporibus quos numquam ducimus doloribus obcaecati laudantium voluptas illum, consequuntur suscipit asperiores, totam sunt commodi molestias quasi itaque. James added your fundraiser “Clean Water for Lagos” to his favourites. This means more visibility for your cause...',
    date: '4 April 2025',
    icon: 'material-symbols:star-outline',
    isRead: false,
  },
  {
    id: 'checkbox4',
    title: 'New supporter alert!',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolores delectus aspernatur temporibus quos numquam ducimus doloribus obcaecati laudantium voluptas illum, consequuntur suscipit asperiores, totam sunt commodi molestias quasi itaque. James added your fundraiser “Clean Water for Lagos” to his favourites. This means more visibility for your cause...',
    date: '4 April 2025',
    icon: 'material-symbols:celebration',
    isRead: true,
  },
]

function Mynotification() {
  const [notifications, setNotifications] = useState(
    initialNotifications.map((n) => ({ ...n, checked: false })),
  )

  const handleCheckboxChange = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, checked: !n.checked } : n)))
  }

  const isAnyChecked = notifications.some((n) => n.checked)
  const areAllChecked = notifications.every((n) => n.checked)

  const handleSelectAll = () => {
    const newCheckedState = !areAllChecked
    setNotifications((prev) => prev.map((n) => ({ ...n, checked: newCheckedState })))
  }

  const handleDeleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !n.checked))
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex justify-between border-b">
        <div className="mt-3 flex gap-2 md:mt-1">
          <input
            type="checkbox"
            className="mt-1 rounded-sm border border-primary"
            checked={areAllChecked}
            onChange={handleSelectAll}
          />
          <p>Select All</p>
        </div>
        <div className="mb-2 flex gap-3">
          <button className="btn-primary rounded-full px-4 py-1">All</button>
          <button className="btn-white rounded-full px-4 py-1">Unread</button>
        </div>
      </div>

      {/* Actions */}
      {isAnyChecked && (
        <div className="flex gap-3">
          <button
            onClick={handleDeleteSelected}
            className="flex space-x-1 truncate rounded border border-transparent bg-red-100 px-3 py-1 text-red-500"
          >
            <Icon icon="material-symbols:delete" width="24" height="24" />
            <p>Delete selected</p>
          </button>
          <div className="flex space-x-1 truncate rounded border border-transparent bg-blue-100 px-3 py-1 text-primary">
            <Icon icon="solar:check-read-bold" width="24" height="24" />
            <p>Mark As Read</p>
          </div>
        </div>
      )}

      {/* Notifications */}
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`border-color flex rounded border-2 p-2 ${
            n.checked ? 'border-blue-500' : 'border-color'
          } ${n.isRead ? 'bg-blue-100' : ''}`}
        >
          <div className="flex items-center justify-center border-r border-textcolor/75 px-1 text-primary md:px-2">
            <Icon icon={n.icon} className="text-2xl md:text-3xl" />
          </div>

          <div className="flex w-full flex-col gap-1.5 px-3">
            <h4 className="text-base font-semibold capitalize text-primary">{n.title}</h4>
            <p className="ellipsis-2 text-sm !leading-tight">{n.description}</p>
            <small className="font-semibold text-primary">{n.date}</small>
          </div>

          <div className="flex flex-col items-center justify-between">
            <button className="btn p-0.5">
              <Icon icon={'mingcute:more-2-line'} className="text-2xl" />
            </button>
            <input
              type="checkbox"
              checked={n.checked}
              onChange={() => handleCheckboxChange(n.id)}
              className="rounded-sm border-2 border-primary"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Mynotification
