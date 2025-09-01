// 
"use client";
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';

export default function ProfilePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    username: '',
    location: '',
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

  return (
    <div className="p-6 max-w-3xl mx-auto">
        <button
        onClick={() => setShowEditModal(true)}
        className="flex gap-1 rounded border border-primary bg-gray-200 px-4 py-1 transition hover:bg-gray-300 ml-auto"
        title="Change Image"
                   >
                     <Icon icon="basil:edit-solid" width="24" height="24" className='text-primary'/>
                     <div className="text-sm font-medium text-primary">Edit</div>
                   </button>

      {/* Your actual profile details go here */}

      {showEditModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="backdrop-blur-sm bg-transparent border border-white/20 w-full max-w-md rounded-lg p-6 shadow-lg text-">
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

      <p>{formData.fullName}</p>
    </div>
  );
}
