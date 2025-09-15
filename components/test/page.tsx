"use client";
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

function Mynotification() {

     const [checkedBoxes, setCheckedBoxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
     });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; checked: any; }; }) => {
    setCheckedBoxes((prevCheckedBoxes) => ({
      ...prevCheckedBoxes,
      [e.target.name]: e.target.checked,
    }));
  };
  const isAnyChecked = Object.values(checkedBoxes).some((checked) => checked);
  return (
   <div className='space-y-2'>

    <div className='flex justify-between border-b'>
        <div className='flex gap-2 md:mt-1 mt-3'>
            <input type='checkbox' className=' rounded-sm border border-primary mt-1'/>
            <p>Select All</p>
        </div>
        <div className='flex gap-3 mb-2'>
            <button className='btn-primary rounded-full py-1 px-4 '>All</button>
            <button className='btn-white rounded-full py-1 px-4'>Unread</button>
        </div>
    </div>
     {isAnyChecked && (
    <div className='flex gap-3'>
        <div className='flex space-x-1 border border-transparent bg-red-100 px-3 py-1 text-red-500 rounded truncate'>
            <Icon icon="material-symbols:delete" width="24" height="24" />
            <p className=''>Delete selected</p>
        </div>
        <div className='flex space-x-1 border border-transparent bg-blue-100 px-3 py-1 text-primary rounded truncate'>
            <Icon icon="solar:check-read-bold" width="24" height="24" />
            <p>Mark As Read</p>
        </div>
    </div>
     )}
     <div  className={`flex  border-2 border-color rounded p-2 ${
          checkedBoxes.checkbox1 ? 'border-blue-500' : 'border-color'
        }`}>
        <div className='flex items-center justify-center px-4 text-primary'>
            <Icon icon="material-symbols:star-outline" width="34" height="34" />
        </div>
        <div className='border-l border-black gap-3 space-x-3'>
            <div className='flex justify-between w-full'>
                <p className='text-primary font-semibold ml-3'>New supporter alert!</p>
                <Icon icon="ant-design:more-outlined" width="24" height="24" className=''/>
            </div>
            <p className='text-sm line-clamp-2'>James added your fundraiser “Clean Water for Lagos” to his favourites. <br />  
              This means more visibility for your cause...
            </p>
            <span className='flex justify-between space-y-2 text-primary font-semibold'>
                <small>4 April 2025</small>
                <input
                  type="checkbox"
                 name="checkbox1"
                 checked={checkedBoxes.checkbox1}
                  onChange={handleChange}
                  className=' rounded-sm border-2 border-primary'
                  
                />
            </span>
        </div>
    </div>




    {/*  */}

     <div className={`flex  border-2 border-color rounded p-2 bg-blue-100 ${
          checkedBoxes.checkbox2 ? 'border-blue-500' : 'border-color'
        }`}>
        <div className='flex items-center justify-center px-4 text-primary'>
            <Icon icon="material-symbols:star-outline" width="34" height="34" />
        </div>
        <div className='border-l border-black gap-3 space-x-3'>
            <div className='flex justify-between w-full'>
                <p className='text-primary font-semibold ml-3'>New supporter alert!</p>
                <Icon icon="ant-design:more-outlined" width="24" height="24" className=''/>
            </div>
            <p className='text-sm line-clamp-2'>James added your fundraiser “Clean Water for Lagos” to his favourites. <br />  
              This means more visibility for your cause...
            </p>
            <span className='flex justify-between space-y-2 text-primary font-semibold'>
                <small>4 April 2025</small>
                <input
                  type="checkbox"
                  name="checkbox2"
                  checked={checkedBoxes.checkbox2}
                  onChange={handleChange}
                  className='rounded-sm border-2 border-primary'
                />
            </span>
        </div>
    </div>


    {/*  */}

     <div className={`flex  border-2 border-color rounded p-2 ${
          checkedBoxes.checkbox3 ? 'border-blue-500' : 'border-color'
        }`}>
        <div className='flex items-center justify-center px-4 text-primary'>
            <Icon icon="material-symbols:star-outline" width="34" height="34" />
        </div>
        <div className='border-l border-black gap-3 space-x-3'>
            <div className='flex justify-between w-full'>
                <p className='text-primary font-semibold ml-3'>New supporter alert!</p>
                <Icon icon="ant-design:more-outlined" width="24" height="24" className=''/>
            </div>
            <p className='text-sm line-clamp-2'>James added your fundraiser “Clean Water for Lagos” to his favourites. <br />  
              This means more visibility for your cause...
            </p>
            <span className='flex justify-between space-y-2 text-primary font-semibold'>
                <small>4 April 2025</small>
                <input
                  type="checkbox"
                  name="checkbox3"
                  checked={checkedBoxes.checkbox3}
                  onChange={handleChange}
                  className='rounded-sm border-2 border-primary'
                />
            </span>
        </div>
    </div>

    {/*  */}


    <div className={`flex  border-2 border-color rounded p-2 bg-blue-100 ${
          checkedBoxes.checkbox2 ? 'border-blue-500' : 'border-color'
        }`}>
        <div className='flex items-center justify-center px-4 text-primary'>
            <Icon icon="material-symbols:celebration" width="34" height="34" />
        </div>
        <div className='border-l border-black gap-3 space-x-3'>
            <div className='flex justify-between w-full'>
                <p className='text-primary font-semibold ml-3'>New supporter alert!</p>
                <Icon icon="ant-design:more-outlined" width="24" height="24" className=''/>
            </div>
            <p className='text-sm line-clamp-2'>James added your fundraiser “Clean Water for Lagos” to his favourites. <br />  
              This means more visibility for your cause...
            </p>
            <span className='flex justify-between space-y-2 text-primary font-semibold'>
                <small>4 April 2025</small>
                <input
                  type="checkbox"
                  name="checkbox2"
                  checked={checkedBoxes.checkbox4}
                  onChange={handleChange}
                  className='rounded-sm border-2 border-primary'
                />
            </span>
        </div>
    </div>
   </div>
  )
}

export default Mynotification