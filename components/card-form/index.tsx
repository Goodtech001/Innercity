"use client";
import React, { useState } from 'react'

function CardForm() {
     const [accountHolderName] = useState('');
  const [accountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountType, setAccountType] = useState('');

   const [cardNumber, setCardNumber] = useState('');

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value.replace(/\s+/g, '');
    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    setCardNumber(formattedValue);
  };


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Validate form data and submit it to the server
    console.log({
      accountHolderName,
      accountNumber,
      bankName,
      ifscCode,
      accountType,
    });
  };
  return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      
      <div className="mb-4  border border-gray-300 rounded p-2">
        <label
          htmlFor="account-number"
          className="block text-sm mb-2 px-1 text-black font-bold"
        >
          Card Number
        </label>
         <input
      type="text"
      value={cardNumber}
      onChange={handleInputChange}
      maxLength={19}
      placeholder="1234 1234 1234 1234"
      className="block w-full p-1 outline-none border-0 rounded focus:outline-none focus:ring-0"
    />
      </div>
      <div className="mb-4">
        <label
          htmlFor="bank-name"
          className="block text-sm font-medium mb-2"
        >
          Bank Name:
        </label>
        <select
          id="bank-name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="" className='font-bold'>Select Bank</option>
          <option value="Bank of America">Zenith Bank</option>
          <option value="Acccess Bank">Acccess Bank</option>
          <option value="First Bank">First Bank</option>
          <option value="Wema Bank">Wema Bank</option>
          <option value="Parallex Bank">Parallex Bank</option>
          <option value="Union Bank">Union Bank</option>
          <option value="Gt Bank">Gt Bank</option>
          {/* Add more options */}
        </select>
      </div>


     <div className='flex gap-3'>
         <div className="mb-4">
        <label
          htmlFor="ifsc-code"
          className="block text-sm font-medium mb-2"
        >
          Expiration
        </label>
        <input
          type="month"
          id="ifsc-code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          placeholder=''
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="ifsc-code"
          className="block text-sm font-medium mb-2"
        >
          CVC
        </label>
        <input
          type="text"
          onChange={(e) => setIfscCode(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
     </div>
      <div className="mb-4">
        <label
          htmlFor="account-type"
          className="block text-sm font-medium mb-2"
        >
          Account Type:
        </label>
        <select
          id="account-type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Account Type</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
          {/* Add more options */}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  )
}

export default CardForm
