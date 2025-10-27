'use client'
import React, { useState } from 'react'
import espees from '@/public/assets/images/espees.png'
import Image from 'next/image'
import CountryCurrencyDropdown from '../country-currency-dropdown'

function StripeForm() {
  const [ifscCode, setIfscCode] = useState('')
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Validate form data and submit it to the server
    console.log({
      ifscCode,
    })
  }

  const [cardNumber, setCardNumber] = useState('')

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/\s+/g, '')
    let formattedValue = ''

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' '
      }
      formattedValue += value[i]
    }

    setCardNumber(formattedValue)
  }
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">
      <div className="mb-4">
        <label htmlFor="ifsc-code" className="mb-2 block text-sm font-medium">
          Pledged Amount
        </label>
        <div className="mb-4 flex w-full">
          <input
            type="number"
            id="ifsc-code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            placeholder=""
            className="block w-full rounded-l border border-gray-300 p-1 outline-none focus:outline-none focus:ring-0"
            required
          />
          <div className="w-ful pr- flex space-x-1 rounded-r border bg-gray-200 p-1">
            <CountryCurrencyDropdown />
          </div>
        </div>
        <div className="mb-4 rounded border border-gray-300 p-2">
          <label htmlFor="account-number" className="mb-2 block px-1 text-sm font-bold text-black">
            Card or debit card
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleInputChange}
            maxLength={19}
            placeholder="1234 1234 1234 1234"
            className="block w-full rounded border-0 p-1 outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <button type="submit" className="btn-primary mt-4 w-fit">
          Donate
        </button>
      </div>
    </form>
  )
}

export default StripeForm
