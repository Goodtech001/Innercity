'use client'
import Input from '@/components/input'
import { IInputState } from '@/components/input/useInput'
import Select from '@/components/select'
import Tooltip from '@/components/ui/tooltip'
import { Icon } from '@iconify/react'
import React, { useEffect, useRef, useState } from 'react'
import dummyCategrories from '@/json/dummy-category.json'
import fundraiseBannerExample from '@/public/assets/images/fundraise-banner-example.jpg'
import { createSelectOptions } from '@/components/select/useSelect'
import FileUpload from '@/components/file-upload'
import Link from 'next/link'
import Image from 'next/image'
import PercentageBar from '@/components/percentage-bar'
import PercentageCircle from '@/components/percentage-circle'
import { useModal } from '@/components/modal/useModal'
import Modal from '@/components/modal'
import avatar from '@/public/assets/images/1-peer-2-peer-5-BMC.png'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/utils/cropImage'

type TabsProps = {
  goForward: () => void
  goBack?: () => void
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
              placeholder="100"
            />
          </div>
        </div>
        {/*  */}
        <div className="col-span-2">
          <label className="label mb-0.5 flex items-center gap-1" htmlFor="campaignDescription">
            <p>Campaign Description</p>
            <Tooltip content={'hello'}>
              <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
            </Tooltip>
          </label>
          <Input
            name="campaignDescription"
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

export function UploadImageTab({ goForward, goBack }: TabsProps) {
  const [images, setImages] = useState<File[]>([])
  const { isModalClosed, openModal, closeModal } = useModal()
  const [isCropModalOpen, setIsCropModalOpen] = useState(false)
  const [croppedImage, setCroppedImage] = useState<string>('') // To pass to AvatarCard
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
 

  const handleOpen = () => {
    openModal()
  }
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>('') // for download

  //   useEffect(() => {
  //   let objectUrl: string | null = null;

  //   if (images[0]) {
  //     objectUrl = URL.createObjectURL(images[0]);
  //   }

  //   return () => {
  //     if (objectUrl) URL.revokeObjectURL(objectUrl);
  //   };
  // }, [images]);
  const imageUrls = useRef<string[]>([])

  useEffect(() => {
    imageUrls.current = images.map((file) => URL.createObjectURL(file))

    return () => {
      imageUrls.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [images])

  interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area|null>(null);

  return (
    <div className="lg:max-w-3xl">
      <div className="col-span-2">
        <label className="label mb-2 flex items-center gap-1" htmlFor="campaignImage">
          <p>Campaign Image</p>
          <Tooltip content={'Campaign image should be at least 800x400px'}>
            <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
          </Tooltip>
        </label>

        <div className="mb-2.5 flex w-fit flex-wrap items-center gap-2 gap-y-3 text-sm font-semibold text-primary">
          <Link
            className="flex items-center justify-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
            href={'#create-avatar'}
          >
            <Icon className="text-base" icon={'carbon:user-avatar-filled-alt'} />{' '}
            <p onClick={handleOpen}>Create Custom Avatar</p>
          </Link>
          <div className="mx-2 hidden h-5 flex-1 border border-textcolor/75 md:block" />
          <Link
            className="flex items-center justify-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
            href={'/resources'}
          >
            <Icon className="text-base" icon={'solar:gallery-wide-bold'} />{' '}
            <p>Browse Our Resources</p>
          </Link>
        </div>
        <FileUpload
          files={images}
          name="campaignImage"
          accept="image/*" // accept images and gifs"
          variant="dropzone"
          containerClassName="bg-primary/15"
          onChange={(e) => {
            const fileList = e.target.files
            if (fileList) setImages([...images, ...Array.from(fileList)])
          }}
          setFiles={setImages}
        />
      </div>

      <div className="flex items-center gap-4">
        <button onClick={goForward} className="btn-primary mt-5 w-fit !px-10">
          Next Step
        </button>
        <button onClick={goBack} className="btn-white mt-5 w-fit !px-10">
          Prev Step{' '}
        </button>
      </div>

      

      <Modal
        className="max-w-xl overflow-hidden rounded-xl bg-white p-5 transition-all duration-300 md:w-full"
        closeModal={closeModal}
        isModalClosed={isModalClosed}
      >
         <button
            onClick={closeModal}
            className="z-50 mr-auto flex rounded-lg border border-[#ffff] bg-transparent px-5 py-1 text-dark shadow-sm transition absolute top-10 right-10"
          >
            <Icon icon="iconoir:cancel" className="h-6 w-6 text-[#ffff] md:h-7 md:w-7" />
          </button>
        <div >

          <div className="">
            <p className="mb-2 text-lg font-bold text-black">Create Avatar</p>
            <h1 className="mb-2 text-sm">
              Choose a beautiful head-shot photo that will be attached to our campaign banner avatar
              generator
            </h1>
            <FileUpload
              files={images}
              name="campaignImage"
              accept="image/*" // accept images and gifs"
              variant="dropzone"
              containerClassName="bg-primary/15"
              onChange={(e) => {
                const fileList = e.target.files
                if (fileList) setImages([...images, ...Array.from(fileList)])
              }}
              setFiles={setImages}
            />
          </div>
          <button onClick={() => setIsCropModalOpen(true)} className="btn-primary w-fit !px-10">
            Preview
          </button>
        </div>
      </Modal>

      <Modal
        isModalClosed={!isCropModalOpen}
        closeModal={() => setIsCropModalOpen(false)}
        className="max-w-3xl rounded-xl bg-white p-10"
      >
        <div className="relative h-96">
          {images[0] && (
            <div className="crop-container relative h-full w-full">
              <Cropper
                image={URL.createObjectURL(images[0])}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="rect" 
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels)
                }}
              />
              {/* Circular mask */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <div className="h-60 w-60 rounded-full border-2 border-white/60" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button onClick={() => setIsCropModalOpen(false)} className="btn-white">
            Cancel
          </button>
          <button
            onClick={async () => {
              const imageUrl = await getCroppedImg(
                URL.createObjectURL(images[0]),
                croppedAreaPixels,
              )
              setCroppedImage(imageUrl)
              setIsCropModalOpen(false)
              setIsPreviewOpen(true) // open avatar preview modal
            }}
            className="btn-primary truncate"
          >
            Crop & Continue
          </button>
        </div>
      </Modal>

      {/* Avatar design */}

      <Modal
        className="max-w-xl overflow-hidden rounded-xl bg-white p-5 transition-all duration-300 md:w-full"
        isModalClosed={!isPreviewOpen}
        closeModal={() => setIsPreviewOpen(false)}
      >
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-bold text-black">Your Avatar Preview</p>

          <div className="relative h-64 w-64">
            {images[0] && (
              <AvatarCard
                cardImageSrc={avatar.src}
                croppedImage1={croppedImage}
                hole1={{ x: 126, y: 86, width: 130, height: 130 }}
                cardDimensions={{ width: 300, height: 300 }}
                text=""
                onPreviewReady={(preview) => setAvatarPreview(preview)}
              />
            )}
          </div>

          <button
            onClick={() => {
              if (!avatarPreview) return
              const link = document.createElement('a')
              link.href = avatarPreview
              link.download = 'my-avatar.jpg'
              link.click()
            }}
            className="btn-primary px-6 py-2"
          >
            Download Avatar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export function PreviewCampaignTab({ goForward }: TabsProps) {
  console.log(goForward)

  return (
    <div>
      <div className="mb-3 aspect-2 w-full overflow-hidden rounded-lg">
        <Image
          src={fundraiseBannerExample}
          height={163}
          width={321}
          className="h-full w-full object-cover object-top"
          alt="fundraise-banner-example.jpg"
        />
      </div>

      <h3 className="text-balance text-2xl font-bold text-dark md:text-3xl">
        JOIN GOV. OSAZE TO PUT SMILES ON THE FACES OF 1000 KIDS FOR HIS BIRTHDAY
      </h3>

      <hr className="my-3 border border-textcolor/50" />

      <p className="font-medium text-dark">
        <Link className="text-primary" href={'#'}>
          Big Minister Testimony
        </Link>{' '}
        Created this fundraising campaign
      </p>

      <div className="mt-3 flex grid-cols-10 flex-wrap items-center justify-between gap-8 gap-y-4 rounded-lg bg-complementary px-3 py-2 text-sm lg:grid">
        <div className="col-span-6 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <p>$58,046 Raised</p>
            <p>•</p>
            <p className="font-normal">End Date: 22nd Sept 2026</p>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <p>
              $Goal: <span className="text-primary">$58,046</span>
            </p>
            <p>•</p>
            <p className="font-normal">100k+ Donors</p>
          </div>
        </div>
        <div className="col-span-4 flex h-full flex-col md:w-full">
          {/* PROGRESS BAR CIRCLE  */}
          <div className="block md:hidden">
            <PercentageCircle progress={20} />
          </div>

          {/* PROGRESS BAR TUBE  */}
          <div className="hidden md:block">
            <p className="mb-1 text-sm font-semibold text-primary">20%</p>
            <PercentageBar value={20} className="h-4" />
            <div className="mt-1 flex items-center justify-between">
              <small>0%</small>
              <small>100%</small>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 flex w-fit items-center justify-center gap-2 rounded-md border border-primary bg-white px-4 py-1.5 text-sm font-semibold text-primary">
        <Icon icon={'mdi:tag'} className="text-xl" />
        <Link href={'/more-campaigns'}>Send Children Back to School</Link>
      </div>

      <hr className="my-3 border border-textcolor/50" />

      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sunt, ipsam corrupti, eaque
        incidunt, quos a numquam officiis molestias tempore fuga quidem. Quaerat non quasi nam vel
        dolorum fuga voluptatibus officia beatae iure perspiciatis nostrum delectus sapiente fugit
        magnam, incidunt eligendi quia quas. At id fuga facere eos itaque facilis totam, aperiam
        doloremque reiciendis ipsa tempora molestiae optio repellat, adipisci nemo illo error fugiat
        repudiandae quas pariatur in sit voluptate delectus? Molestias, totam ullam est earum
        repudiandae ratione ipsam animi eius reprehenderit deserunt? Consectetur facere obcaecati ad
        praesentium sint? Quae quidem pariatur quis vitae reiciendis inventore iusto, modi deleniti
        velit.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={() => console.log()} className="btn-primary mt-5 w-fit !px-10">
          Publish Campaign
        </button>
        <button onClick={() => console.log()} className="btn-white mt-5 w-fit !px-10">
          Save as Draft
        </button>
      </div>
    </div>
  )
}

import AvatarCard from '@/components/avatar-card'


