'use client'
import Input from '@/components/input'
import { IInputState } from '@/components/input/useInput'
import Select from '@/components/select'
import Tooltip from '@/components/ui/tooltip'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import dummyCategrories from '@/json/dummy-category.json'
import { createSelectOptions } from '@/components/select/useSelect'

type TabsProps = {
  goForward: () => void
}

export function CampaignInformationTab({ goForward }: TabsProps) {
  const [campaignTitle, setCampaignTitle] = useState<IInputState>({ value: '' }) //?? optionally you can define the type to see the values that are available when interacted with
  const [category, setCategory] = useState<IInputState>({ value: '' })
  const [campaignEndDate, setCampaignEndDate] = useState<IInputState>({ value: '' })
  const [targetAmount, setTargetAmount] = useState<IInputState>({ value: '' })
  const [campaignDescription, setCampaignDescription] = useState<IInputState>({ value: '' })

  return (
    <div className="lg:max-w-3xl">
      <div className="flex grid-cols-2 flex-col gap-4 md:grid">
        {/*  */}
        <div className="">
          <label className="label mb-0.5 flex items-center gap-1" htmlFor="name">
            <p>Campaign Title</p>
            <Tooltip content={'hello'}>
              <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
            </Tooltip>
          </label>
          <Input
            name="name"
            setState={setCampaignTitle}
            state={campaignTitle}
            type="text"
            required
            placeholder="Aiding the Homeless"
          />
        </div>
        {/*  */}
        <div className="">
          <label className="label mb-0.5 flex items-center gap-1" htmlFor="category">
            <p>Select Campaign Category</p>
            <Tooltip content={'hello'}>
              <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
            </Tooltip>
          </label>
          <Select
            name="category"
            options={createSelectOptions(dummyCategrories, 'category', 'id')}
            placeholder="Categories"
            setState={setCategory}
            state={category}
            required
          />
        </div>
        {/*  */}
        <div className="">
          <label className="label mb-0.5 flex items-center gap-1" htmlFor="campaignEndDate">
            <p>Campaign End Date</p>
            <Tooltip content={'hello'}>
              <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
            </Tooltip>
          </label>
          <Input
            name="campaignEndDate"
            setState={setCampaignEndDate}
            state={campaignEndDate}
            type="date"
            required
          />
        </div>
        {/*  */}
        <div className="">
          <label className="label mb-0.5 flex items-center gap-1" htmlFor="targetAmount">
            <p>Target Amount</p>
            <Tooltip content={'hello'}>
              <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
            </Tooltip>
          </label>
          <div className="relative overflow-hidden rounded-md">
            <div className="absolute left-0.5 top-[4%] z-10 flex h-full max-h-11 cursor-pointer items-center justify-center rounded-l bg-primary/25 px-2 text-primary md:top-[3%] md:max-h-10">
              <p>$</p>
            </div>
            <Input
              name="targetAmount"
              setState={setTargetAmount}
              state={targetAmount}
              type="amount"
              className="pl-8"
              required
              placeholder="1,000"
            />
          </div>
        </div>
        {/*  */}
        <div className="col-span-2">
          <label className="label mb-0.5 flex items-center gap-1" htmlFor="name">
            <p>Campaign Description</p>
            <Tooltip content={'hello'}>
              <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
            </Tooltip>
          </label>
          <Input
            name="name"
            setState={setCampaignDescription}
            state={campaignDescription}
            type="text-area"
            required
            placeholder="Take a moment to share the story behind your campaign..."
          />
        </div>
      </div>

      <button onClick={goForward} className="btn-primary mt-5 w-fit !px-10">
        Next Step
      </button>
    </div>
  )
}

export function UploadImageTab({ goForward }: TabsProps) {
  return <div>UploadImageTab</div>
}

export function PreviewCampaignTab({ goForward }: TabsProps) {
  return <div>PreviewCampaignTab</div>
}
