import { Icon } from '@iconify/react'
import React, { useState } from 'react'

function Editpage() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    username: '',
    location: '',
    bio: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Handle form submission logic here
    console.log('Updated data:', formData)
    setShowEditModal(false) // close modal
  }

  const ProfileName = 'Goodnews'
  const ProfileUsername = 'goodnews_'
  const ProfileEmail = 'youremail.com'
  const ProfilePhone = '1234 567 8910'
  const ProfileLocation = 'Lagos, Nigeria'

  return (
    <div className="mt-5">
      <button
        onClick={() => setShowEditModal(true)}
        className="ml-auto flex gap-1 rounded border border-primary bg-gray-100 px-4 py-1 transition hover:bg-gray-300"
        title="Change Image"
      >
        <Icon icon="basil:edit-solid" width="24" height="24" className="text-primary" />
        <div className="text-sm font-medium text-primary">Edit</div>
      </button>

      {/* Your actual profile details go here */}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
          <div className="border-color text- w-full max-w-md rounded-lg border-2 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit Profile</h2>
            <div className="space-y-1">
              <label htmlFor="text" className="font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              />
              <label htmlFor="tel" className="font-medium">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              />
              <label htmlFor="email" className="font-medium">
                email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              />
              <label htmlFor="username" className="font-medium">
                username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              />
              <label htmlFor="text" className="font-medium">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="flex ">
        <div className="space-y-3">
          <div>
            <label htmlFor="text"> Full Name</label>
            <p className="md:line-clamp-0 line-clamp-2 font-medium text-black">
              {formData.fullName || ProfileName}
            </p>
          </div>

          <div>
            <label htmlFor="text">Username</label>
            <p className="font-medium text-black">@ {formData.username || ProfileUsername}</p>
          </div>

          <div>
            <label htmlFor="text">Loction</label>
            <p className="font-medium text-black">{formData.location || ProfileLocation}</p>
          </div>

          <div>
            <label htmlFor="text">Gender</label>
            <p className="font-medium text-black">Male</p>
          </div>
        </div>

        <div className="mx-auto space-y-3">
          <div>
            <label htmlFor="text">Email</label>
            <p className="truncate font-medium text-black">{formData.email || ProfileEmail}</p>
          </div>

          <div>
            <label htmlFor="text">Phone</label>
          <p className="font-medium text-black">+234 {formData.phone || ProfilePhone}</p>
          </div>

         <div>
           <label htmlFor="text">Joined</label>
          <p className="font-medium text-black">15 Apr 2025</p>
         </div>

         <div>
           <label htmlFor="text">Bio</label>
          <p className="truncate font-medium text-black">A stitch in time saves nine</p>
         </div>
        </div>
      </section>
    </div>
  )
}

export default Editpage
