'use client'
import {
  CampaignInformationTab,
  PreviewCampaignTab,
  UploadImageTab,
} from '@/layouts/create-campaign-tabs'
import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function CreateCampaignPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(1)
  const [tabs] = useState([
    {
      id: 1,
      title: 'Campaign Basic Information',
      shortTitle: 'Campaign Info',
      description: 'Enter campaign title and description',
      icon: 'majesticons:checkbox-list-detail',
    },
    {
      id: 2,
      title: 'Upload Campaign Image',
      shortTitle: 'Upload Image',
      description: 'Provide a banner for your campaign',
      icon: 'majesticons:image',
    },
    {
      id: 3,
      title: 'Preview & Share Campaign',
      shortTitle: 'Preview & Share',
      description: 'A final look at your campaign!',
      icon: 'icon-park-solid:preview-open',
    },
  ])
  const stepsTab = [
    {
      step: 1,
      name: 'campaign-information',
      component: () => <CampaignInformationTab goForward={goForward} />,
    },
    {
      step: 2,
      name: 'upload-banner',
      component: () => <UploadImageTab goForward={goForward} />,
    },
    {
      step: 3,
      name: 'preview-share-campaign',
      component: () => <PreviewCampaignTab goForward={goForward} />,
    },
  ]

  const CurrentComponent = stepsTab.find((step) => step.step === activeStep)?.component

  function goForward() {
    setActiveStep((prev) => Math.min(prev + 1, stepsTab.length))
  }

  function goBack() {
    if (activeStep === 1) {
      router.back()
    }
    setActiveStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <>
      <TopNavbar />
      <div className="container h-fit">
        <div className="mb-3 flex items-center justify-between border-b py-1.5 pt-6">
          <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">
            Create <span className="hidden md:inline">Fundraising</span> Campaign
          </h3>

          <button
            onClick={goBack}
            className="btn hidden w-fit border border-error bg-fade-error px-6 text-sm text-error md:inline"
          >
            Go back
          </button>
        </div>

        <div className="mb-6 flex flex-col-reverse gap-4 md:grid md:grid-cols-12">
          <div className="rounded-xl border p-1 md:col-span-7 md:p-2 lg:col-span-8">
            <div className="mb-6 flex items-center justify-between">
              <h5 className="hidden text-xl font-bold text-dark md:block">
                {tabs[activeStep - 1].title}
              </h5>
              <h5 className="block text-lg font-bold text-dark md:hidden">
                {tabs[activeStep - 1].shortTitle}
              </h5>

              <span className="btn w-fit bg-complementary px-3 py-1 text-xs font-normal text-primary md:text-sm">
                Step {activeStep}/{stepsTab.length}
              </span>
            </div>
            {CurrentComponent && <CurrentComponent />}
          </div>
          <div className="grid h-full grid-cols-3 gap-3 rounded-xl border p-1 md:col-span-5 md:flex md:flex-col md:p-2 lg:col-span-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveStep(tab.id)}
                className="flex max-w-xs cursor-pointer flex-col items-center gap-2 rounded-lg border p-1 hover:bg-primary/5 md:max-w-none md:flex-row md:p-2"
              >
                <button
                  className={`rounded-md border border-primary p-1.5 text-lg md:p-2 md:text-2xl ${activeStep >= tab.id ? 'bg-primary text-light' : 'bg-complementary text-primary'}`}
                >
                  <Icon icon={tab.icon} />
                </button>
                <div className="text-sm">
                  <h4 className="text-center text-xs font-semibold text-dark md:text-left md:text-sm">
                    <span className="hidden md:inline">{tab.title}</span>
                    <span className="inline md:hidden">{tab.shortTitle}</span>
                  </h4>
                  <p className="hidden md:inline">{tab.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
