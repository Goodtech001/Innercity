import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

function Editpage() {
      const [showEditModal, setShowEditModal] = useState(false);
      const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        username: '',
        location: '',
        bio: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSave = () => {
        // Handle form submission logic here
        console.log('Updated data:', formData);
        setShowEditModal(false); // close modal
      };
      
      const ProfileName = 'Goodnews'
      const ProfileUsername = 'goodnews_'
      const ProfileEmail = 'youremail.com'
      const ProfilePhone = '1234 567 8910'
      const ProfileLocation = 'Lagos, Nigeria'

  return (
    <div className='mt-5'>
       <button
              onClick={() => setShowEditModal(true)}
              className="flex gap-1 rounded border border-primary bg-gray-100 px-4 py-1 transition hover:bg-gray-300 ml-auto"
              title="Change Image"
            >
              <Icon icon="basil:edit-solid" width="24" height="24" className='text-primary'/>
              <div className="text-sm font-medium text-primary">Edit</div>
            </button>

              {/* Your actual profile details go here */}

      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
          <div className=" bg-white border-2 border-color w-full max-w-md rounded-lg p-6 shadow-lg text-">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-1">
              <label htmlFor="text" className='font-medium'>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <label htmlFor="tel" className='font-medium'>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <label htmlFor="email" className='font-medium'>email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <label htmlFor="username" className='font-medium'>username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <label htmlFor="text" className='font-medium'>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

            <section className='flex'> 
              <div className='space-y-1'>
                <div>
                    <label htmlFor="text"> Full Name</label>
                <p className='text-black font-medium line-clamp-2 md:line-clamp-0'>{formData.fullName || ProfileName}</p>
                </div>

                <div>
                    <label htmlFor="text">Username</label>
                <p className='text-black font-medium'>@ {formData.username || ProfileUsername}</p>
                </div>

                 <div>
                <label htmlFor="text">Loction</label>
                <p className='text-black font-medium'>{formData.location || ProfileLocation}</p>
                </div>

                <div>
                <label htmlFor="text">Gender</label>
                <p className='text-black font-medium'>Male</p>
                </div>
              </div>

              <div className='mx-auto'>
                <div>
                <label htmlFor="text">Email</label>
                <p className='text-black font-medium truncate'>{formData.email || ProfileEmail}</p>
                </div>

                <label htmlFor="text">Phone</label>
                <p className='text-black font-medium'>+234 {formData.phone || ProfilePhone}</p>

                <label htmlFor="text">Joined</label>
                <p className='text-black font-medium'>15 Apr 2025</p>

                <label htmlFor="text">Bio</label>
                <p className='text-black font-medium truncate'>A stitch in time saves nine</p>
              </div>
            </section>

    </div>
)
}

export default Editpage
