'use client'
import Input from '@/components/input'
import { IInputState } from '@/components/input/useInput'
import Tooltip from '@/components/ui/tooltip'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'

type TabsProps = {
  goForward: () => void
}

export function CampaignInformationTab({ goForward }: TabsProps) {
  const [campaignTitle, setCampaignTitle] = useState<IInputState>({ value: '' }) //?? optionally you can define the type to see the values that are available when interacted with

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="">
          <div className="">
            <label className="label" htmlFor="name">
              <p>Campaign Title</p>
              <Tooltip content={'hello'}>
                <Icon icon={''} />
              </Tooltip>
            </label>
            <Input
              name="name"
              setState={setCampaignTitle}
              state={campaignTitle}
              type="text"
              required
              placeholder="Enter Campaign Title"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function UploadImageTab({ goForward }: TabsProps) {
  return <div>UploadImageTab</div>
}

export function PreviewCampaignTab({ goForward }: TabsProps) {
  return <div>PreviewCampaignTab</div>
}
