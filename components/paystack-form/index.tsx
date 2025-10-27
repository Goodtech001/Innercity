'use client'
import React, { useState } from 'react'
import espees from '@/public/assets/images/espees.png'
import Image from 'next/image'

function PaystackForm() {
  const [ifscCode, setIfscCode] = useState('')
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Validate form data and submit it to the server
    console.log({
      ifscCode,
    })
  }
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">
      <p className='text-primary'>Dear Goodnews,</p>
      <small className='text-primary'>
        Thank you for your sponsorship. You will now be redirected to our Espee gateway. After
        making your payment, kindly wait till you are redirected back to our website, so your
        payment is credited into the campaign. <br /> Thank you!
      </small>
      <div className="mb-4 mt-6">
        <label htmlFor="ifsc-code" className="mb-2 block text-sm font-medium">
          Pledged Amount
        </label>
        <div className="flex w-full">
          <input
            type="number"
            id="ifsc-code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            placeholder=""
            className="block w-full rounded-l border border-gray-300 p-2"
            required
          />
          <div className="w-ful flex space-x-1 rounded-r border bg-gray-200 p-2 pr-7">
            <Image src={espees} alt="espees" height={24} width={24} />
            <div>Espees</div>
          </div>
        </div>
        <button type="submit" className="btn-primary mt-4 w-fit">
          Donate
        </button>
      </div>
    </form>
  )
}

export default  PaystackForm
