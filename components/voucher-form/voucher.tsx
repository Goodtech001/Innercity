'use client'
import React, { useState } from 'react'

function VoucherForm() {
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
      <p className="text-sm max-w-lg">Recharge vouchers can be purchased at the Innercity Mission offices. You can send email to <span className='hover:underline text-primary cursor-pointer'>info@theinnercitymission.org</span> or call <span className='hover:underline text-primary cursor-pointer'>+2348123445240</span> to purchase voucher.</p>
      
      <div className="mb-4 mt-6">
        <label htmlFor="ifsc-code" className="mb-2 block text-sm font-medium">
          Insert Voucher
        </label>

        <input
          type="number"
          id="ifsc-code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          placeholder="Voucher"
          className="block w-full rounded-l border border-gray-300 p-2"
          required
        />

        <button type="submit" className="btn-primary mt-4 w-fit">
          Donate with voucher
        </button>
      </div>
    </form>
  )
}

export default VoucherForm
