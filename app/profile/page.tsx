'use client'
import DpUploader from '@/components/dp-uploader'
import Editpage from '@/components/edit-profile'
import ImageUploader from '@/components/image-uploader'
import {
  CampaignInformationTab,
  PreviewCampaignTab,
  UploadImageTab,
} from '@/layouts/create-campaign-tabs'
import Footer from '@/layouts/footer'
import Notifications from '@/layouts/profile-tabs/notification'
import TopNavbar from '@/layouts/topnavbar'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const urlQueryTab = new URLSearchParams(window.location.search).get('tab')
  const [activeStep, setActiveStep] = useState(1)
  const [tabs] = useState([
    {
      id: 1,
      title: 'Profile',
      shortTitle: 'Profile',
      description: 'View & edit basic details about yourself',
      icon: 'iconamoon:profile-fill',
    },
    {
      id: 2,
      title: 'My Campaigns',
      shortTitle: 'My Campaigns',
      description: 'Manage your campaigns here',
      icon: 'ri:funds-fill',
    },
    {
      id: 3,
      title: 'Notifications',
      shortTitle: 'Notifications',
      description: 'See updates you should be aware of',
      icon: 'bxs:notification',
    },
    {
      id: 4,
      title: 'Chat',
      shortTitle: 'Chat',
      description: 'Chat with the ICM support team',
      icon: 'material-symbols:chat',
    },
  ])

  const stepsTab = [
    {
      step: 1,
      name: '/',
      component: () => (
        <div>
          <ImageUploader />
          <DpUploader />
          <Editpage />
        </div>
      ),
    },
    {
      step: 2,
      name: 'campaigns',
      component: () => <PreviewCampaignTab goForward={goForward} />,
    },
    {
      step: 3,
      name: 'notifications',
      component: () => <Notifications />,
    },
    {
      step: 4,
      name: 'chat',
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

  useEffect(() => {
    if (urlQueryTab) {
      const tabIndex = stepsTab.findIndex(
        (tab) => tab.name.toLowerCase() === urlQueryTab.toLowerCase(),
      )
      console.log(tabIndex)

      // setActiveStep(tabs[tabIndex].id)
    } else {
      // setActiveStep(1)
    }
  }, [stepsTab, tabs, urlQueryTab])

  return (
    <>
      <TopNavbar />
      <div className="container h-fit">
        <div className="mb-3 flex items-center justify-between border-b py-1.5 pt-6">
          <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">
            {tabs[activeStep - 1].title}
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
            {CurrentComponent && <CurrentComponent />}
          </div>
          <div className="grid h-full grid-cols-3 gap-3 rounded-xl border p-1 md:col-span-5 md:flex md:flex-col md:p-2 lg:col-span-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveStep(tab.id)}
                className="flex max-w-xs cursor-pointer flex-col items-center gap-2 gap-y-5 rounded-lg p-1 hover:bg-primary/5 md:max-w-none md:flex-row md:p-2"
              >
                <button
                  className={`rounded-md border border-primary p-1.5 text-lg md:p-2 md:text-2xl ${activeStep === tab.id ? 'bg-primary text-light' : 'bg-complementary text-primary'}`}
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
