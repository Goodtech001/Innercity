'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

function Mynotification() {
  const [checkedBoxes, setCheckedBoxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; checked: any } }) => {
    setCheckedBoxes((prevCheckedBoxes) => ({
      ...prevCheckedBoxes,
      [e.target.name]: e.target.checked,
    }))
  }
  const isAnyChecked = Object.values(checkedBoxes).some((checked) => checked)
  return (
    <div className="space-y-2">
      <div className="flex justify-between border-b">
        <div className="mt-3 flex gap-2 md:mt-1">
          <input type="checkbox" className="mt-1 rounded-sm border border-primary" />
          <p>Select All</p>
        </div>
        <div className="mb-2 flex gap-3">
          <button className="btn-primary rounded-full px-4 py-1">All</button>
          <button className="btn-white rounded-full px-4 py-1">Unread</button>
        </div>
      </div>
      {isAnyChecked && (
        <div className="flex gap-3">
          <div className="flex space-x-1 truncate rounded border border-transparent bg-red-100 px-3 py-1 text-red-500">
            <Icon icon="material-symbols:delete" width="24" height="24" />
            <p className="">Delete selected</p>
          </div>
          <div className="flex space-x-1 truncate rounded border border-transparent bg-blue-100 px-3 py-1 text-primary">
            <Icon icon="solar:check-read-bold" width="24" height="24" />
            <p>Mark As Read</p>
          </div>
        </div>
      )}
      <div
        className={`border-color flex rounded border-2 p-2 ${
          checkedBoxes.checkbox1 ? 'border-blue-500' : 'border-color'
        }`}
      >
        <div className="flex items-center justify-center px-2 text-primary">
          <Icon icon="material-symbols:star-outline" width="34" height="34" />
        </div>
        <div className="gap-3 space-x-3 border-l border-textcolor">
          <div className="flex md:w-[158%] justify-between">
            <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
            <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
          </div>
          <p className="line-clamp-2 text-sm">
            James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
            This means more visibility for your cause...
          </p>
          <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
            <small>4 April 2025</small>
            <input
              type="checkbox"
              name="checkbox1"
              checked={checkedBoxes.checkbox1}
              onChange={handleChange}
              className="rounded-sm border-2 border-primary"
            />
          </span>
        </div>
      </div>

      {/*  */}

      <div
        className={`border-color flex rounded border-2 bg-blue-100 p-2 ${
          checkedBoxes.checkbox2 ? 'border-blue-500' : 'border-color'
        }`}
      >
        <div className="flex items-center justify-center px-2 text-primary">
          <Icon icon="material-symbols:star-outline" width="34" height="34" />
        </div>
        <div className="gap-3 space-x-3 border-l border-textcolor">
          <div className="flex md:w-[158%] justify-between">
            <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
            <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
          </div>
          <p className="line-clamp-2 text-sm">
            James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
            This means more visibility for your cause...
          </p>
          <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
            <small>4 April 2025</small>
            <input
              type="checkbox"
              name="checkbox2"
              checked={checkedBoxes.checkbox2}
              onChange={handleChange}
              className="rounded-sm border-2 border-primary"
            />
          </span>
        </div>
      </div>

      {/*  */}

      <div
        className={`border-color flex rounded border-2 p-2 ${
          checkedBoxes.checkbox3 ? 'border-blue-500' : 'border-color'
        }`}
      >
        <div className="flex items-center justify-center px-2 text-primary">
          <Icon icon="material-symbols:star-outline" width="34" height="34" />
        </div>
        <div className="gap-3 space-x-3 border-l border-textcolor">
          <div className="flex md:w-[158%] justify-between">
            <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
            <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
          </div>
          <p className="line-clamp-2 text-sm">
            James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
            This means more visibility for your cause...
          </p>
          <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
            <small>4 April 2025</small>
            <input
              type="checkbox"
              name="checkbox3"
              checked={checkedBoxes.checkbox3}
              onChange={handleChange}
              className="rounded-sm border-2 border-primary"
            />
          </span>
        </div>
      </div>

      {/*  */}

      <div
        className={`border-color flex rounded border-2 bg-blue-100 p-2 ${
          checkedBoxes.checkbox4 ? 'border-blue-500' : 'border-color'
        }`}
      >
        <div className="flex items-center justify-center px-2 text-primary">
          <Icon icon="material-symbols:celebration" width="34" height="34" />
        </div>
        <div className="gap-3 space-x-3 border-l border-textcolor">
          <div className="flex md:w-[158%] justify-between">
            <p className="ml-3 font-semibold text-primary">New supporter alert!</p>
            <Icon icon="ant-design:more-outlined" width="24" height="24" className="" />
          </div>
          <p className="line-clamp-2 text-sm">
            James added your fundraiser “Clean Water for Lagos” to his favourites. <br />
            This means more visibility for your cause...
          </p>
          <span className="flex md:w-[155%] justify-between space-y-2 font-semibold text-primary">
            <small>4 April 2025</small>
            <input
              type="checkbox"
              name="checkbox4"
              checked={checkedBoxes.checkbox4}
              onChange={handleChange}
              className="rounded-sm border-2 border-primary"
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Mynotification
