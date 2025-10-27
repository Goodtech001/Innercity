'use client'
import React, { useState } from 'react'
import CountryCurrencyDropdown from '../country-currency-dropdown'

function PaypalForm() {
  const [accountHolderName] = useState('')
  const [accountNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [accountType, setAccountType] = useState('')

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Validate form data and submit it to the server
    console.log({
      accountHolderName,
      accountNumber,
      fullName,
      ifscCode,
      accountType,
    })
  }
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">
      <div className="mb-4">
        <label htmlFor="bank-name" className="mb-2 block text-sm font-medium">
          FullName
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder='Fullname'
          className="block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="bank-name" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder='email'
          className="block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-0"
        />
      </div>

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
            placeholder="..."
            className="block w-full rounded-l border border-gray-300 p-2 focus:outline-none focus:ring-0"
            required
          />
          <div className="w-ful pr- flex space-x-1 rounded-r border bg-gray-200 p-1">
            <CountryCurrencyDropdown />
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Pay with Paypal
      </button>
    </form>
  )
}

export default PaypalForm
