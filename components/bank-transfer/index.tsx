import Link from 'next/link'
import React from 'react'

function BankTransfer() {
  return (
    <div className="mx-auto max-w-md p-4">
        <p className='mb-4 text-sm'>You can make payment directly to the InnerCity Mission Account via bank transfer </p>
        <small className=''>Account Name: InnerCity Mission</small><br />
        <small>Account Number: 2030022369</small><br />
        <p className='mb-4 text-sm'>Bank: Parallex Bank</p>
        <small className='mt-4'>Kindly attach successful payment receipt and send to</small><br />
        <Link href="" className='text-primary hover:underline text-sm'>fundraise@theinnercitymission.ngo.</Link><br />
        <small>For more information</small><br />
        <small>Please call Ruthelle : +2348083842789</small><br />
        <small>Thank you.</small>
    </div>
  )
}

export default BankTransfer