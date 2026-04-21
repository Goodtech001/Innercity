/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Tooltip from '@/components/ui/tooltip'
import { Icon } from '@iconify/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createSelectOptions } from '@/components/select/useSelect'
import FileUpload from '@/components/file-upload'
import Link from 'next/link'
import PercentageBar from '@/components/percentage-bar'
import { useModal } from '@/components/modal/useModal'
import Modal from '@/components/modal'
import avatar from '@/public/assets/images/1-peer-2-peer-5-BMC.png'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/utils/cropImage'
import AvatarCard from '@/components/avatar-card'
import { getAllCategoryService } from '@/app/auth/auth.service'
import { baseUrl } from '@/constants'
import { useRouter } from 'next/navigation'
import Logo from '@/components/logo'
// import CampaignEcardPreview from '@/components/campaign-ecard/campaign-ecard-preview'

type TabsProps = {
  goForward: () => void
  goBack?: () => void
  formData?: any
  setFormData?: React.Dispatch<React.SetStateAction<any>>
}
type BaseTabsProps = {
  goForward: () => void
  goBack?: () => void
}
type FormTabsProps = BaseTabsProps & {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
}
type PreviewProps = BaseTabsProps & {
  formData: any
}

// const [formData, setFormData] = useState({
//   title: '',
//   category_id: '',
//   period: '',
//   goal: '',
//   excerpt: '',
//   campaign_image: null,
//   ecard_image: '',
// })

// --- STEP 1: CAMPAIGN INFORMATION ---

// --- FULL SCREEN LOADER COMPONENT ---
const FullPageLoader = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-4">
      <Logo variant="alt" className="w-32 animate-pulse" />
      {/* <div className="flex items-center gap-2 font-medium text-primary">
          <Logo variant="alt" className="w-24" />
        <span>Creating your campaign...</span>
      </div> */}
    </div>
  </div>
)

export function CampaignInformationTab({ goForward, formData, setFormData }: FormTabsProps) {
  const [categories, setCategories] = useState<any[]>([])
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<number | ''>('')
  const [goal, setGoal] = useState<number | ''>('')
  const [period, setPeriod] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('course-training-profile')
    const parsed = stored ? JSON.parse(stored) : null
    const token = parsed?.token

    if (!token) {
      router.replace('/sign-up')
    }
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoryService()
        const data = res?.data || res
        setCategories(data || [])
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }

    fetchCategories()
  }, [])

  const handleCreateCampaign = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        alert('Session expired: please login again')
        setLoading(false)
        return
      }

      const payload = {
        title,
        category_id: Number(categoryId),
        goal: Number(goal),
        period,
        excerpt,
      }

      const res = await fetch(`${baseUrl}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message)
      }

      const campaignId = data?.id ?? data?.data?.id

      setFormData((prev: any) => ({
        ...prev,
        id: campaignId,
        title,
        category_id: Number(categoryId),
        goal: Number(goal),
        period,
        excerpt,
      }))

      goForward()
    } catch (err) {
      console.error(err)
      alert('Error creating campaign')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg:max-w-3xl">
      {/* ✅ SHOW FULL PAGE LOADER WHEN LOADING */}
      {loading && (
        <FullPageLoader message={loading ? 'Processing campaign...' : 'Saving campaign...'} />
      )}

      <div className="flex grid-cols-2 flex-col gap-4 md:grid">
        {/* Title */}
        <div>
          <label className="label mb-0.5 flex items-center gap-1">
            <p>Campaign Title</p>
          </label>
          <input
            name="name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Aiding the Homeless"
            className="w-full rounded-lg border-2 border-gray-300 p-2 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label mb-0.5 flex items-center gap-1">
            <p>Select Campaign Category</p>
          </label>
          <select
            name="category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
            className="w-full rounded-lg border-2 border-gray-300 p-2"
          >
            <option value="">Categories</option>
            {createSelectOptions(categories, 'name', 'id').map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* End Date */}
        <div>
          <label className="label mb-0.5 flex items-center gap-1">
            <p>Campaign End Date</p>
          </label>
          <input
            type="date"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 p-2"
          />
        </div>

        {/* Target */}
        <div>
          <label className="label mb-0.5 flex items-center gap-1">
            <p>Target Amount</p>
          </label>
          <div className="relative flex h-10 w-full items-center overflow-hidden rounded-md border-2 border-gray-300">
            <div className="absolute left-0.5 top-[0] z-10 flex h-full items-center justify-center bg-primary/25 px-2 text-primary">
              $
            </div>
            <input
              name="targetAmount"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              type="number"
              className="w-full pl-10 outline-none"
              required
              placeholder="100"
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="label mb-0.5 flex items-center gap-1">
            <p>Campaign Description</p>
          </label>
          <textarea
            name="campaignDescription"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            placeholder="Take a moment to share the story behind your campaign..."
            className="h-[200px] w-full rounded-lg border-2 border-gray-300 p-2"
          />
        </div>
      </div>

      <button
        onClick={handleCreateCampaign}
        disabled={loading}
        className="btn-primary mt-5 flex w-fit items-center justify-center gap-2 !px-10 disabled:opacity-70"
      >
        Next Step
      </button>
    </div>
  )
}

// --- STEP 2: UPLOAD IMAGE ---
// export function UploadImageTab({ goForward, goBack, formData, setFormData }: FormTabsProps) {
//   const [images, setImages] = useState<File[]>([])
//   const { isModalClosed, openModal, closeModal } = useModal()
//   const [isCropModalOpen, setIsCropModalOpen] = useState(false)
//   const [croppedImage, setCroppedImage] = useState<string>('')
//   const [crop, setCrop] = useState({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState(1)
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false)
//   const [avatarPreview, setAvatarPreview] = useState<string>('')
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

//   // useEffect(() => {
//   //   if (!images.length) return

//   //   const processImage = async () => {
//   //     const file = images[0]

//   //     // store campaign image locally
//   //     setFormData((prev: any) => ({
//   //       ...prev,
//   //       campaign_image: file,
//   //     }))

//   //     try {
//   //       // 1️⃣ upload image
//   //       const imageId = await uploadImage(file)

//   //       if (!formData.category_id) {
//   //         console.error('Category missing before avatar generation')
//   //         return
//   //       }

//   //       if (!imageId) {
//   //         console.error('Image upload failed')
//   //         return
//   //       }

//   //       // 2️⃣ generate avatar banner
//   //       const thumbnailId = await generateAvatarCard(imageId)

//   //       setFormData((prev: any) => ({
//   //         ...prev,
//   //         thumbnail_id: thumbnailId,
//   //       }))

//   //       // 3️⃣ save banner id
//   //       // setFormData((prev: any) => ({
//   //       //   ...prev,
//   //       //   banner_id: bannerId,
//   //       // }))

//   //       console.log('Banner ID stored:', thumbnailId)
//   //     } catch (err) {
//   //       console.error('Avatar pipeline failed:', err)
//   //     }
//   //   }

//   //   processImage()
//   // }, [images])

//   useEffect(() => {
//     if (!images.length) return
//     if (!formData?.category_id) return // wait properly

//     const processImage = async () => {
//       try {
//         const file = images[0]

//         if (!(file instanceof File)) {
//           console.error('❌ Not a valid file')
//           return
//         }

//         // const thumbnailId = await generateAvatarCard(file)
//         setFormData((prev: any) => ({
//           ...prev,
//           campaign_image: file,
//         }))

//         // 1️⃣ upload image
//         const imageId = await uploadImage(file)

//         if (!imageId) {
//           console.error('Image upload failed')
//           return
//         }

//         // 2️⃣ generate thumbnail
//         const thumbnailId = await generateAvatarCard(file)

//         if (!thumbnailId) {
//           console.error('Thumbnail generation failed')
//           return
//         }

//         // ✅ IMPORTANT FIX
//         setFormData((prev: any) => ({
//           ...prev,
//           thumbnail_id: Number(thumbnailId),
//         }))

//         console.log('✅ Thumbnail ID stored:', thumbnailId)
//       } catch (err) {
//         console.error('Avatar pipeline failed:', err)
//       }
//     }

//     processImage()
//   }, [images, formData.category_id]) // ✅ FIXED
//   const getThumbnailById = async (id: number) => {
//   try {
//     const res = await fetch(`${baseUrl}/uploads/${id}`)
//     const data = await res.json()

//     return data?.data || data
//   } catch (err) {
//     console.error('Failed to fetch thumbnail', err)
//     return null
//   }
// }

//   useEffect(() => {
//     console.log('STEP 2 FORM DATA:', formData)
//   }, [formData])

//   const generateAvatarCard = async (file: File) => {
//     try {
//       const token = localStorage.getItem('token')

//       const form = new FormData()
//       form.append('name', formData.title || 'Campaign')
//       form.append('userImage', file) // ✅ EXACT KEY FROM POSTMAN
//       form.append('excerpt', formData.excerpt || '')

//       console.log('📦 FormData entries:')
//       for (const pair of form.entries()) {
//         console.log(pair[0], pair[1])
//       }

//       const res = await fetch(
//         `${baseUrl}/card-template/generate/category/${formData.category_id}`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ ONLY THIS
//           },
//           body: form,
//         },
//       )

//       const data = await res.json()

//       console.log('📥 RESPONSE:', data)

//       if (!res.ok) {
//         console.error('❌ ERROR RESPONSE:', data)
//         return null
//       }

//       return data?.id
//     } catch (err) {
//       console.error('❌ FETCH ERROR:', err)
//       return null
//     }
//   }

//   const uploadImage = async (file: File) => {
//     const token = localStorage.getItem('token')

//     const form = new FormData()
//     form.append('file', file)

//     const res = await fetch(`${baseUrl}/uploads`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: form,
//     })

//     const data = await res.json()

//     console.log('UPLOAD RESPONSE:', data)

//     return data?.id
//   }

//   const handleUploadImage = async () => {
//     try {
//       const token = localStorage.getItem('token')

//       if (!token) {
//         alert('Please login again')
//         return
//       }

//       if (!formData?.id) {
//         console.error('Campaign ID missing')
//         return
//       }

//       const payload = {
//         id: formData.id,
//         title: formData.title,
//         category_id: Number(formData.category_id),
//         goal: Number(formData.goal),
//         period: formData.period,
//         excerpt: formData.excerpt,
//         thumbnail_id: Number(formData.thumbnail_id),
//       }

//       if (!formData.thumbnail_id) {
//         alert('Image still processing. Please wait.')
//         return
//       }

//       console.log('UPDATING CAMPAIGN:', payload)

//       const res = await fetch(`${baseUrl}/campaigns`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       })

//       const data = await res.json()

//       console.log('UPDATE RESPONSE:', data)

//       if (!res.ok) {
//         throw new Error(data?.message || 'Campaign update failed')
//       }

//       goForward()
//     } catch (err) {
//       console.error('Update error:', err)
//       alert('Failed to update campaign')
//     }
//   }
//   return (
//     <div className="lg:max-w-3xl">
//       <div className="col-span-2">
//         <label className="label mb-2 flex items-center gap-1" htmlFor="campaignImage">
//           <p>Campaign Image</p>
//           <Tooltip content={'Campaign image should be at least 800x400px'}>
//             <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
//           </Tooltip>
//         </label>

//         <div className="mb-2.5 flex w-fit flex-wrap items-center gap-2 gap-y-3 text-sm font-semibold text-primary">
//           <button
//             className="flex items-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
//             onClick={openModal}
//           >
//             <Icon className="text-base" icon={'carbon:user-avatar-filled-alt'} />
//             <p>Create Custom Avatar</p>
//           </button>
//           <div className="mx-2 hidden h-5 flex-1 border border-textcolor/75 md:block" />
//           <Link
//             className="flex items-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
//             href={'/resources'}
//           >
//             <Icon className="text-base" icon={'solar:gallery-wide-bold'} />
//             <p>Browse Our Resources</p>
//           </Link>
//         </div>

//         <FileUpload
//           files={images}
//           name="campaignImage"
//           accept="image/*"
//           variant="dropzone"
//           containerClassName="bg-primary/15"
//           onChange={(e) => {
//             const fileList = e.target.files

//             if (!fileList || fileList.length === 0) {
//               console.error('❌ No file selected')
//               return
//             }

//             const file = fileList[0]

//             console.log('📁 FILE DEBUG:', {
//               name: file.name,
//               type: file.type,
//               size: file.size,
//               isFile: file instanceof File,
//             })

//             setImages([file])
//           }}
//           setFiles={setImages}
//         />
//       </div>

//       <div className="mt-5 flex items-center gap-4">
//         <button
//           onClick={handleUploadImage}
//           // disabled={isProcessing || !formData.thumbnail_id}
//           className="btn-primary w-fit !px-10 disabled:opacity-50"
//         >
//           Next step
//         </button>
//         <button onClick={goBack} className="btn-white w-fit !px-10">
//           Prev Step
//         </button>
//       </div>

//       {/* --- CROPPER & AVATAR MODALS (Logic Kept Intact) --- */}
//       <Modal
//         className="max-w-xl rounded-xl bg-white p-5 md:w-full"
//         closeModal={closeModal}
//         isModalClosed={isModalClosed}
//       >
//         <div className="p-4">
//           <p className="mb-2 text-lg font-bold text-black">Create Avatar</p>
//           <FileUpload
//             files={images}
//             name="campaignImage"
//             accept="image/*"
//             variant="dropzone"
//             containerClassName="bg-primary/15"
//             onChange={(e) => {
//               const fileList = e.target.files
//               if (fileList) setImages([...images, ...Array.from(fileList)])
//             }}
//             setFiles={setImages}
//           />
//           <button onClick={() => setIsCropModalOpen(true)} className="btn-primary mt-4 w-full">
//             Preview
//           </button>
//         </div>
//       </Modal>

//       <Modal
//         isModalClosed={!isCropModalOpen}
//         closeModal={() => setIsCropModalOpen(false)}
//         className="max-w-3xl rounded-xl bg-white p-10"
//       >
//         <div className="relative h-96">
//           {images[0] && (
//             <Cropper
//               image={URL.createObjectURL(images[0])}
//               crop={crop}
//               zoom={zoom}
//               aspect={1}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={(_, px) => setCroppedAreaPixels(px)}
//             />
//           )}
//         </div>
//         <div className="mt-4 flex justify-end gap-4">
//           <button
//             onClick={async () => {
//               const img = await getCroppedImg(URL.createObjectURL(images[0]), croppedAreaPixels)
//               setCroppedImage(img)
//               setIsCropModalOpen(false)
//               setIsPreviewOpen(true)
//             }}
//             className="btn-primary"
//           >
//             Crop & Continue
//           </button>
//         </div>
//       </Modal>

//       <Modal
//         isModalClosed={!isPreviewOpen}
//         closeModal={() => setIsPreviewOpen(false)}
//         className="max-w-xl rounded-xl bg-white p-5"
//       >
//         <div className="flex flex-col items-center">
//           <AvatarCard
//             cardImageSrc={avatar.src}
//             croppedImage1={croppedImage}
//             hole1={{ x: 126, y: 86, width: 130, height: 130 }}
//             cardDimensions={{ width: 300, height: 300 }}
//             text=""
//             onPreviewReady={(preview) => setAvatarPreview(preview)}
//           />
//           <button
//             onClick={() => {
//               const link = document.createElement('a')
//               link.href = avatarPreview
//               link.download = 'avatar.jpg'
//               link.click()
//             }}
//             className="btn-primary mt-4"
//           >
//             Download Avatar
//           </button>
//         </div>
//       </Modal>
//     </div>
//   )
// }

// --- STEP 3: PREVIEW & PUBLISH ---
// export function PreviewCampaignTab({ goForward, formData }: PreviewProps) {
//   const [loading, setLoading] = useState(false)

//   //  const handlePublish = async () => {
//   //   setLoading(true)

//   //   try {
//   //     const token = localStorage.getItem("token")

//   //     if (!token) {
//   //       alert("Please login again")
//   //       setLoading(false)
//   //       return
//   //     }

//   //     // extract real values
//   //     const title =
//   //       typeof formData.title === "object"
//   //         ? formData.title.value
//   //         : formData.title

//   //     const category_id =
//   //       typeof formData.category_id === "object"
//   //         ? Number(formData.category_id.value)
//   //         : Number(formData.category_id)

//   //     const goal =
//   //       typeof formData.goal === "object"
//   //         ? Number(formData.goal.value)
//   //         : Number(formData.goal)

//   //     const period =
//   //       typeof formData.period === "object"
//   //         ? formData.period.value
//   //         : formData.period

//   //     const excerpt =
//   //       typeof formData.excerpt === "object"
//   //         ? formData.excerpt.value
//   //         : formData.excerpt

//   //     console.log("Payload:", {
//   //       title,
//   //       category_id,
//   //       goal,
//   //       period,
//   //       excerpt,
//   //     })

//   //     const body = new FormData()

//   //     body.append("title", title)
//   //     body.append("category_id", String(category_id))
//   //     body.append("goal", String(goal))
//   //     body.append("period", period || "")
//   //     body.append("excerpt", excerpt || "")

//   //     if (formData.campaign_image) {
//   //       body.append("campaign_image", formData.campaign_image)
//   //     }

//   //     if (formData.ecard_image) {
//   //       body.append("ecard_image", formData.ecard_image)
//   //     }

//   //     const res = await fetch(`${baseUrl}/campaigns/`, {
//   //       method: "POST",
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body,
//   //     })

//   //     const data = await res.json()

//   //     if (!res.ok) {
//   //       console.error(data)
//   //       throw new Error(data?.message || "Campaign creation failed")
//   //     }

//   //     alert("Campaign published successfully 🎉")

//   //   } catch (error) {
//   //     console.error("Publish failed:", error)
//   //     alert("Failed to publish campaign")
//   //   }

//   //   setLoading(false)
//   // }

//   const handlePublish = async () => {
//     setLoading(true)

//     try {
//       const token = localStorage.getItem('token')

//       if (!token) {
//         alert('Please login again')
//         return
//       }

//       if (!formData?.id) {
//         alert('Campaign ID missing')
//         return
//       }
//       const payload = {
//         id: formData.id,
//         title: formData.title,
//         category_id: Number(formData.category_id),
//         goal: Number(formData.goal),
//         period: formData.period,
//         excerpt: formData.excerpt,
//         thumbnail_id: Number(formData.thumbnail_id),
//         published: true,
//       }

//       const res = await fetch(`${baseUrl}/campaigns`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       })

//       console.log(payload)

//       const data = await res.json()

//       if (!res.ok) {
//         console.error(data)
//         throw new Error(data?.message || 'Publish failed')
//       }

//       console.log('Campaign published:', data)

//       alert('Campaign published successfully 🎉')
//     } catch (err) {
//       console.error('Publish failed:', err)
//       alert('Failed to publish campaign')
//     }

//     setLoading(false)
//   }

//   const template = formData?.template || null

//   const templateImage = formData.thumbnail?.url || '/assets/images/fundraise-banner-example.jpg'

//   const userImage = useMemo(() => {
//     if (!formData?.campaign_image) return null
//     return URL.createObjectURL(formData.campaign_image)
//   }, [formData?.campaign_image])

//   return (
//     <div>
//       {/* ======================
//           ECARD PREVIEW
//       ======================= */}

//       <div className="mb-3 flex aspect-2 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
//         <div className="relative w-full max-w-[400px]">
//           {/* TEMPLATE BACKGROUND */}

//           {templateImage && (
//             <img
//               src={templateImage}
//               width={1400}
//               height={600}
//               alt="ecard-template"
//               className="w-full object-cover"
//             />
//           )}

//           {/* USER IMAGE */}

//           {/* {userImage && (
//             <img
//               src={userImage}
//               alt="user"
//               style={{
//                 position: 'absolute',
//                 left: template?.holeX || 100,
//                 top: template?.holeY || 100,
//                 width: template?.holeWidth || 120,
//                 height: template?.holeHeight || 120,
//                 objectFit: 'cover',
//                 borderRadius: '50%',
//               }}
//             />
//           )} */}

//           {/* TEXT */}

//           {formData?.excerpt && (
//             <p
//               style={{
//                 position: 'absolute',
//                 left: template?.excerptX || 200,
//                 top: template?.excerptY || 400,
//                 color: template?.textColor || 'black',
//                 fontWeight: 'bold',
//                 maxWidth: '250px',
//               }}
//             >
//               {formData.excerpt}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ======================
//           TITLE
//       ======================= */}

//       <h3 className="text-balance text-2xl font-bold uppercase text-dark md:text-3xl">
//         {formData.title || 'CAMPAIGN TITLE PREVIEW'}
//       </h3>

//       <hr className="my-3 border border-textcolor/50" />

//       {/* ======================
//           PROGRESS SECTION
//       ======================= */}

//       <div className="mt-3 flex flex-wrap items-center justify-between gap-8 gap-y-4 rounded-lg bg-complementary px-3 py-2 text-sm">
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center gap-2 font-semibold">
//             <p>$0 Raised</p>
//             <p>•</p>
//             <p className="font-normal">End Date: {formData.period || 'Not selected'}</p>
//           </div>

//           <div className="flex items-center gap-2 font-semibold">
//             <p>
//               Goal: <span className="text-primary">${formData.goal || '0'}</span>
//             </p>
//           </div>
//         </div>

//         <div className="max-w-[200px] flex-1">
//           <p className="mb-1 text-xs font-semibold text-primary">0%</p>
//           <PercentageBar value={0} className="h-3" />
//         </div>
//       </div>

//       {/* ======================
//           DESCRIPTION
//       ======================= */}

//       <p className="mt-5 text-sm leading-relaxed">
//         {formData.excerpt || 'Campaign description will appear here...'}
//       </p>

//       {/* ======================
//           ACTION BUTTONS
//       ======================= */}

//       <div className="mt-10 flex items-center gap-4">
//         <button
//           disabled={loading}
//           onClick={handlePublish}
//           className="btn-primary w-fit truncate !px-10"
//         >
//           {loading ? 'Publishing...' : 'Publish Campaign'}
//         </button>

//         <button
//           onClick={() => console.log('Saved Draft:', formData)}
//           className="btn-white w-fit truncate !px-10"
//         >
//           Save as Draft
//         </button>
//       </div>

//       <div className="mt-6 flex justify-center px-6 text-center">
//         {
//           // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//           formData.published ? (
//             <p>Campaign published successfully 🎉</p>
//           ) : (
//             <p>Campaign not published</p>
//           )
//         }
//       </div>
//     </div>
//   )
// }

export function UploadImageTab({ goForward, goBack, formData, setFormData }: FormTabsProps) {
  const [images, setImages] = useState<File[]>([])
  const { isModalClosed, openModal, closeModal } = useModal()
  const [isCropModalOpen, setIsCropModalOpen] = useState(false)
  const [croppedImage, setCroppedImage] = useState<string>('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  // ✅ LOADING STATES
  const [isProcessing, setIsProcessing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!images.length) return
    if (!formData?.category_id) return

    const processImage = async () => {
      try {
        const file = images[0]
        if (!(file instanceof File)) return

        setIsProcessing(true)

        setFormData((prev: any) => ({
          ...prev,
          campaign_image: file,
        }))

        // 1️⃣ upload image
        const imageId = await uploadImage(file)

        if (!imageId) {
          console.error('Image upload failed')
          return
        }

        // 2️⃣ generate thumbnail
        const thumbnailId = await generateAvatarCard(file)

        if (!thumbnailId) {
          console.error('Thumbnail generation failed')
          return
        }

        setFormData((prev: any) => ({
          ...prev,
          thumbnail_id: Number(thumbnailId),
        }))

        console.log('✅ Thumbnail ID stored:', thumbnailId)
      } catch (err) {
        console.error('Avatar pipeline failed:', err)
      } finally {
        setIsProcessing(false)
      }
    }

    processImage()
  }, [images, formData.category_id])

  const generateAvatarCard = async (file: File) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')

      // 1. Check the exact keys used in your GlassProfile component
      const profileKey = 'course-training-profile'
      const userKey = 'user'

      const storedProfile = localStorage.getItem(profileKey) || sessionStorage.getItem(profileKey)
      const storedUser = localStorage.getItem(userKey) || sessionStorage.getItem(userKey)

      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null
      const parsedUser = storedUser ? JSON.parse(storedUser) : null

      // 2. Extract fullname based on the structure saved in handleSave
      // Your profile component saves it as: { user: { fullname: "..." } } OR { fullname: "..." }
      const userName =
        parsedProfile?.user?.fullname ||
        parsedProfile?.fullname ||
        parsedUser?.user?.fullname ||
        parsedUser?.fullname ||
        'User'

      console.log('DEBUG: Generating e-card for name:', userName)

      const form = new FormData()
      form.append('name', userName) // This matches the 'fullName' field from GlassProfile
      form.append('userImage', file)
      form.append('excerpt', formData.excerpt || '')

      const res = await fetch(
        `${baseUrl}/card-template/generate/category/${formData.category_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        },
      )

      const data = await res.json()

      if (!res.ok) {
        console.error('E-card generation failed:', data)
        return null
      }

      return data?.id
    } catch (err) {
      console.error('Avatar Card Generation Error:', err)
      return null
    }
  }

  const uploadImage = async (file: File) => {
    const token = localStorage.getItem('token')
    const form = new FormData()
    form.append('file', file)

    const res = await fetch(`${baseUrl}/uploads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })
    const data = await res.json()
    return data?.id
  }

  const handleUploadImage = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login again')
        return
      }

      if (!formData?.id) return

      // ✅ LOADING LOGIC
      if (!formData.thumbnail_id) return

      setLoading(true)

      const payload = {
        id: formData.id,
        title: formData.title,
        category_id: Number(formData.category_id),
        goal: Number(formData.goal),
        period: formData.period,
        excerpt: formData.excerpt,
        thumbnail_id: Number(formData.thumbnail_id),
      }

      const res = await fetch(`${baseUrl}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Update failed')

      // ✅ EXTRACT THUMBNAIL URL FROM RESPONSE
      const data = await res.json()
      const updatedCampaign = data.data || data // Adjust based on your API nesting

      // If you need to store it in your formData state for the next step:
      if (updatedCampaign.thumbnail?.url) {
        setFormData((prev: any) => ({
          ...prev,
          thumbnail_url: updatedCampaign.thumbnail.url,
        }))
      }

      goForward()
    } catch (err) {
      alert('Failed to update campaign')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg:max-w-3xl">
      {/* ✅ FULL PAGE LOADER FOR BOTH PROCESSING AND FINAL SAVING */}
      {(loading || isProcessing) && (
        <FullPageLoader
          message={isProcessing ? 'Processing image assets...' : 'Saving campaign...'}
        />
      )}

      <div className="col-span-2">
        <label className="label mb-2 flex items-center gap-1" htmlFor="campaignImage">
          <p>Campaign Image</p>
          <Tooltip content={'Campaign image should be at least 800x400px'}>
            <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
          </Tooltip>
        </label>

        <div className="mb-2.5 flex w-fit flex-wrap items-center gap-2 gap-y-3 text-sm font-semibold text-primary">
          {/* <button
            className="flex items-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
            onClick={openModal}
          >
            <Icon className="text-base" icon={'carbon:user-avatar-filled-alt'} />
            <p>Create Custom Avatar</p>
          </button>
          <div className="mx-2 hidden h-5 flex-1 border border-textcolor/75 md:block" />
          <Link
            className="flex items-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
            href={'/resources'}
          >
            <Icon className="text-base" icon={'solar:gallery-wide-bold'} />
            <p>Browse Our Resources</p>
          </Link> */}
          <p className="font-normal text-gray-500">
            Note: Each category has an e-card atttached to them , kindly input your image and click
            next step for the picture chosen and ecard to merge.
          </p>
        </div>

        <FileUpload
          files={images}
          name="campaignImage"
          accept="image/*"
          variant="dropzone"
          containerClassName="bg-primary/15"
          onChange={(e) => {
            const fileList = e.target.files
            if (fileList && fileList[0]) setImages([fileList[0]])
          }}
          setFiles={setImages}
        />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={handleUploadImage}
          disabled={isProcessing || loading || !formData.thumbnail_id}
          className="btn-primary flex w-fit items-center justify-center gap-2 !px-10 disabled:opacity-50"
        >
          Next step
        </button>
        <button onClick={goBack} className="btn-white w-fit !px-10">
          Prev Step
        </button>
      </div>

      {/* --- CROPPER & AVATAR MODALS --- */}
      <Modal
        className="max-w-xl rounded-xl bg-white p-5 md:w-full"
        closeModal={closeModal}
        isModalClosed={isModalClosed}
      >
        <div className="p-4">
          <p className="mb-2 text-lg font-bold text-black">Create Avatar</p>
          <FileUpload
            files={images}
            name="campaignImage"
            accept="image/*"
            variant="dropzone"
            containerClassName="bg-primary/15"
            onChange={(e) => {
              const fileList = e.target.files
              if (fileList) setImages([...images, ...Array.from(fileList)])
            }}
            setFiles={setImages}
          />
          <button onClick={() => setIsCropModalOpen(true)} className="btn-primary mt-4 w-full">
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
            <Cropper
              image={URL.createObjectURL(images[0])}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, px) => setCroppedAreaPixels(px)}
            />
          )}
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={async () => {
              const img = await getCroppedImg(URL.createObjectURL(images[0]), croppedAreaPixels)
              setCroppedImage(img)
              setIsCropModalOpen(false)
              setIsPreviewOpen(true)
            }}
            className="btn-primary"
          >
            Crop & Continue
          </button>
        </div>
      </Modal>

      <Modal
        isModalClosed={!isPreviewOpen}
        closeModal={() => setIsPreviewOpen(false)}
        className="max-w-xl rounded-xl bg-white p-5"
      >
        <div className="flex flex-col items-center">
          <AvatarCard
            cardImageSrc={avatar.src}
            croppedImage1={croppedImage}
            hole1={{ x: 126, y: 86, width: 130, height: 130 }}
            cardDimensions={{ width: 300, height: 300 }}
            text=""
            onPreviewReady={(preview) => setAvatarPreview(preview)}
          />
          <button
            onClick={() => {
              const link = document.createElement('a')
              link.href = avatarPreview
              link.download = 'avatar.jpg'
              link.click()
            }}
            className="btn-primary mt-4"
          >
            Download Avatar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export function PreviewCampaignTab({ goForward, formData }: any) {
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(true) // ✅ Track image loading
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handlePublish = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login again')
        return
      }

      const payload = {
        id: formData.id,
        title: formData.title,
        category_id: Number(formData.category_id),
        goal: Number(formData.goal),
        period: formData.period,
        excerpt: formData.excerpt,
        thumbnail_id: Number(formData.thumbnail_id),
        published: true,
      }

      const res = await fetch(`${baseUrl}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Publish failed')
      setShowSuccessModal(true)
    } catch (err: any) {
      alert(err.message || 'Failed to publish campaign')
    } finally {
      setLoading(false)
    }
  }

  const template = formData?.template || null
  // ✅ Prioritize the uploaded thumbnail, removed the hardcoded default banner
  const displayImage = formData.thumbnail_url || formData.thumbnail?.url

  return (
    <div className="relative">
      {/* ======================
          ECARD PREVIEW CONTAINER
      ======================= */}
      <div className="relative mb-3 flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
        {/* ✅ LOADER: Shows while the image is fetching */}
        {imageLoading && displayImage && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-2">
              <Icon icon="line-md:loading-twotone-loop" className="text-3xl text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Loading Preview...
              </p>
            </div>
          </div>
        )}

        <div className="relative h-full w-full">
          {displayImage ? (
            <img
              src={displayImage}
              alt="campaign-banner"
              className="h-full w-full object-cover" // ✅ Fills the side/container
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
              <p className="text-sm">No image uploaded</p>
            </div>
          )}

          {/* Text Overlays */}
          {formData?.excerpt && !imageLoading && (
            <p
              className="pointer-events-none absolute"
              style={{
                left: template?.excerptX || '50%',
                top: template?.excerptY || '70%',
                color: template?.textColor || 'white',
                fontWeight: 'bold',
                textShadow: '0px 2px 4px rgba(0,0,0,0.5)', // Better visibility over images
                maxWidth: '80%',
              }}
            ></p>
          )}
        </div>
      </div>

      <h3 className="text-balance text-2xl font-bold uppercase text-dark md:text-3xl">
        {formData.title || 'CAMPAIGN TITLE PREVIEW'}
      </h3>

      <hr className="my-3 border border-textcolor/50" />

      {/* ... Rest of your UI (Stats, Progress Bar, Description) ... */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-8 gap-y-4 rounded-lg bg-complementary px-3 py-2 text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <p>$0 Raised</p>
            <p>•</p>
            <p className="font-normal">End Date: {formData.period || 'Not selected'}</p>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <p>
              Goal: <span className="text-primary">${formData.goal || '0'}</span>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed">
        {formData.excerpt || 'Campaign description will appear here...'}
      </p>

      <div className="mt-10 flex items-center gap-4">
        <button
          disabled={loading}
          onClick={handlePublish}
          className="btn-primary w-fit truncate !px-10"
        >
          {loading ? 'Publishing...' : 'Publish Campaign'}
        </button>
      </div>

      {/* Success Modal remains the same */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl duration-300">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Icon icon="solar:check-circle-bold" className="h-10 w-10" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">Success!</h2>
            <p className="mb-8 text-gray-500">Your campaign is now live and ready for donations.</p>

            <div className="flex flex-col gap-3">
              <Link href="/profile?tab=campaigns">
                <button className="btn-primary w-full py-3">Go to My Campaigns</button>
              </Link>

              <Link href="/">
                <button className="w-full py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-800">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 'use client'
// import Input from '@/components/input'
// import { IInputState } from '@/components/input/useInput'
// import Select from '@/components/select'
// import Tooltip from '@/components/ui/tooltip'
// import { Icon } from '@iconify/react'
// import React, { useEffect, useRef, useState } from 'react'
// import dummyCategrories from '@/json/dummy-category.json'
// import fundraiseBannerExample from '@/public/assets/images/fundraise-banner-example.jpg'
// import { createSelectOptions } from '@/components/select/useSelect'
// import FileUpload from '@/components/file-upload'
// import Link from 'next/link'
// import Image from 'next/image'
// import PercentageBar from '@/components/percentage-bar'
// import PercentageCircle from '@/components/percentage-circle'
// import { useModal } from '@/components/modal/useModal'
// import Modal from '@/components/modal'
// import avatar from '@/public/assets/images/1-peer-2-peer-5-BMC.png'
// import Cropper from 'react-easy-crop'
// import getCroppedImg from '@/utils/cropImage'

// type TabsProps = {
//   goForward: () => void
//   goBack?: () => void
// }

// export function CampaignInformationTab({ goForward }: TabsProps) {
//   const [campaignTitle, setCampaignTitle] = useState<IInputState>({ value: '' }) //?? optionally you can define the type to see the values that are available when interacted with
//   const [category, setCategory] = useState<IInputState>({ value: '' })
//   const [campaignEndDate, setCampaignEndDate] = useState<IInputState>({ value: '' })
//   const [targetAmount, setTargetAmount] = useState<IInputState>({ value: '' })
//   const [campaignDescription, setCampaignDescription] = useState<IInputState>({ value: '' })

//   return (
//     <div className="lg:max-w-3xl">
//       <div className="flex grid-cols-2 flex-col gap-4 md:grid">
//         {/*  */}
//         <div className="">
//           <label className="label mb-0.5 flex items-center gap-1" htmlFor="name">
//             <p>Campaign Title</p>
//             <Tooltip content={'hello'}>
//               <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
//             </Tooltip>
//           </label>
//           <Input
//             name="name"
//             setState={setCampaignTitle}
//             state={campaignTitle}
//             type="text"
//             required
//             placeholder="Aiding the Homeless"
//           />
//         </div>
//         {/*  */}
//         <div className="">
//           <label className="label mb-0.5 flex items-center gap-1" htmlFor="category">
//             <p>Select Campaign Category</p>
//             <Tooltip content={'hello'}>
//               <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
//             </Tooltip>
//           </label>
//           <Select
//             name="category"
//             options={createSelectOptions(dummyCategrories, 'category', 'id')}
//             placeholder="Categories"
//             setState={setCategory}
//             state={category}
//             required
//           />
//         </div>
//         {/*  */}
//         <div className="">
//           <label className="label mb-0.5 flex items-center gap-1" htmlFor="campaignEndDate">
//             <p>Campaign End Date</p>
//             <Tooltip content={'hello'}>
//               <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
//             </Tooltip>
//           </label>
//           <Input
//             name="campaignEndDate"
//             setState={setCampaignEndDate}
//             state={campaignEndDate}
//             type="date"
//             required
//           />
//         </div>
//         {/*  */}
//         <div className="">
//           <label className="label mb-0.5 flex items-center gap-1" htmlFor="targetAmount">
//             <p>Target Amount</p>
//             <Tooltip content={'hello'}>
//               <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
//             </Tooltip>
//           </label>
//           <div className="relative overflow-hidden rounded-md">
//             <div className="absolute left-0.5 top-[4%] z-10 flex h-full max-h-11 cursor-pointer items-center justify-center rounded-l bg-primary/25 px-2 text-primary md:top-[3%] md:max-h-10">
//               <p>$</p>
//             </div>
//             <Input
//               name="targetAmount"
//               setState={setTargetAmount}
//               state={targetAmount}
//               type="amount"
//               className="pl-8"
//               required
//               placeholder="100"
//             />
//           </div>
//         </div>
//         {/*  */}
//         <div className="col-span-2">
//           <label className="label mb-0.5 flex items-center gap-1" htmlFor="campaignDescription">
//             <p>Campaign Description</p>
//             <Tooltip content={'hello'}>
//               <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
//             </Tooltip>
//           </label>
//           <Input
//             name="campaignDescription"
//             setState={setCampaignDescription}
//             state={campaignDescription}
//             type="text-area"
//             required
//             placeholder="Take a moment to share the story behind your campaign..."
//           />
//         </div>
//       </div>

//       <button onClick={goForward} className="btn-primary mt-5 w-fit !px-10">
//         Next Step
//       </button>
//     </div>
//   )
// }

// export function UploadImageTab({ goForward, goBack }: TabsProps) {
//   const [images, setImages] = useState<File[]>([])
//   const { isModalClosed, openModal, closeModal } = useModal()
//   const [isCropModalOpen, setIsCropModalOpen] = useState(false)
//   const [croppedImage, setCroppedImage] = useState<string>('') // To pass to AvatarCard
//   const [crop, setCrop] = useState({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState(1)

//   const handleOpen = () => {
//     openModal()
//   }
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false)
//   const [avatarPreview, setAvatarPreview] = useState<string>('') // for download

//   //   useEffect(() => {
//   //   let objectUrl: string | null = null;

//   //   if (images[0]) {
//   //     objectUrl = URL.createObjectURL(images[0]);
//   //   }

//   //   return () => {
//   //     if (objectUrl) URL.revokeObjectURL(objectUrl);
//   //   };
//   // }, [images]);
//   const imageUrls = useRef<string[]>([])

//   useEffect(() => {
//     imageUrls.current = images.map((file) => URL.createObjectURL(file))

//     return () => {
//       imageUrls.current.forEach((url) => URL.revokeObjectURL(url))
//     }
//   }, [images])

//   interface Area {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area|null>(null);

//   return (
//     <div className="lg:max-w-3xl">
//       <div className="col-span-2">
//         <label className="label mb-2 flex items-center gap-1" htmlFor="campaignImage">
//           <p>Campaign Image</p>
//           <Tooltip content={'Campaign image should be at least 800x400px'}>
//             <Icon icon={'si:info-duotone'} className="bg-transparent text-textcolor/75" />
//           </Tooltip>
//         </label>

//         <div className="mb-2.5 flex w-fit flex-wrap items-center gap-2 gap-y-3 text-sm font-semibold text-primary">
//           <Link
//             className="flex items-center justify-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
//             href={'#create-avatar'}
//           >
//             <Icon className="text-base" icon={'carbon:user-avatar-filled-alt'} />{' '}
//             <p onClick={handleOpen}>Create Custom Avatar</p>
//           </Link>
//           <div className="mx-2 hidden h-5 flex-1 border border-textcolor/75 md:block" />
//           <Link
//             className="flex items-center justify-center gap-1.5 rounded-md p-1 hover:bg-primary/15"
//             href={'/resources'}
//           >
//             <Icon className="text-base" icon={'solar:gallery-wide-bold'} />{' '}
//             <p>Browse Our Resources</p>
//           </Link>
//         </div>
//         <FileUpload
//           files={images}
//           name="campaignImage"
//           accept="image/*" // accept images and gifs"
//           variant="dropzone"
//           containerClassName="bg-primary/15"
//           onChange={(e) => {
//             const fileList = e.target.files
//             if (fileList) setImages([...images, ...Array.from(fileList)])
//           }}
//           setFiles={setImages}
//         />
//       </div>

//       <div className="flex items-center gap-4">
//         <button onClick={goForward} className="btn-primary mt-5 w-fit !px-10">
//           Next Step
//         </button>
//         <button onClick={goBack} className="btn-white mt-5 w-fit !px-10">
//           Prev Step{' '}
//         </button>
//       </div>

//       <Modal
//         className="max-w-xl overflow-hidden rounded-xl bg-white p-5 transition-all duration-300 md:w-full"
//         closeModal={closeModal}
//         isModalClosed={isModalClosed}
//       >
//          <button
//             onClick={closeModal}
//             className="z-50 mr-auto flex rounded-lg border border-[#ffff] bg-transparent px-5 py-1 text-dark shadow-sm transition absolute top-10 right-10"
//           >
//             <Icon icon="iconoir:cancel" className="h-6 w-6 text-[#ffff] md:h-7 md:w-7" />
//           </button>
//         <div >

//           <div className="">
//             <p className="mb-2 text-lg font-bold text-black">Create Avatar</p>
//             <h1 className="mb-2 text-sm">
//               Choose a beautiful head-shot photo that will be attached to our campaign banner avatar
//               generator
//             </h1>
//             <FileUpload
//               files={images}
//               name="campaignImage"
//               accept="image/*" // accept images and gifs"
//               variant="dropzone"
//               containerClassName="bg-primary/15"
//               onChange={(e) => {
//                 const fileList = e.target.files
//                 if (fileList) setImages([...images, ...Array.from(fileList)])
//               }}
//               setFiles={setImages}
//             />
//           </div>
//           <button onClick={() => setIsCropModalOpen(true)} className="btn-primary w-fit !px-10">
//             Preview
//           </button>
//         </div>
//       </Modal>

//       <Modal
//         isModalClosed={!isCropModalOpen}
//         closeModal={() => setIsCropModalOpen(false)}
//         className="max-w-3xl rounded-xl bg-white p-10"
//       >
//         <div className="relative h-96">
//           {images[0] && (
//             <div className="crop-container relative h-full w-full">
//               <Cropper
//                 image={URL.createObjectURL(images[0])}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 cropShape="rect"
//                 showGrid={false}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={(_, croppedAreaPixels) => {
//                   setCroppedAreaPixels(croppedAreaPixels)
//                 }}
//               />
//               {/* Circular mask */}
//               <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
//                 <div className="h-60 w-60 rounded-full border-2 border-white/60" />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-4 flex justify-end gap-4">
//           <button onClick={() => setIsCropModalOpen(false)} className="btn-white">
//             Cancel
//           </button>
//           <button
//             onClick={async () => {
//               const imageUrl = await getCroppedImg(
//                 URL.createObjectURL(images[0]),
//                 croppedAreaPixels,
//               )
//               setCroppedImage(imageUrl)
//               setIsCropModalOpen(false)
//               setIsPreviewOpen(true) // open avatar preview modal
//             }}
//             className="btn-primary truncate"
//           >
//             Crop & Continue
//           </button>
//         </div>
//       </Modal>

//       {/* Avatar design */}

//       <Modal
//         className="max-w-xl overflow-hidden rounded-xl bg-white p-5 transition-all duration-300 md:w-full"
//         isModalClosed={!isPreviewOpen}
//         closeModal={() => setIsPreviewOpen(false)}
//       >
//         <div className="flex flex-col items-center space-y-4">
//           <p className="text-lg font-bold text-black">Your Avatar Preview</p>

//           <div className="relative h-64 w-64">
//             {images[0] && (
//               <AvatarCard
//                 cardImageSrc={avatar.src}
//                 croppedImage1={croppedImage}
//                 hole1={{ x: 126, y: 86, width: 130, height: 130 }}
//                 cardDimensions={{ width: 300, height: 300 }}
//                 text=""
//                 onPreviewReady={(preview) => setAvatarPreview(preview)}
//               />
//             )}
//           </div>

//           <button
//             onClick={() => {
//               if (!avatarPreview) return
//               const link = document.createElement('a')
//               link.href = avatarPreview
//               link.download = 'my-avatar.jpg'
//               link.click()
//             }}
//             className="btn-primary px-6 py-2"
//           >
//             Download Avatar
//           </button>
//         </div>
//       </Modal>
//     </div>
//   )
// }

// export function PreviewCampaignTab({ goForward }: TabsProps) {
//   console.log(goForward)

//   return (
//     <div>
//       <div className="mb-3 aspect-2 w-full overflow-hidden rounded-lg">
//         <Image
//           src={fundraiseBannerExample}
//           height={163}
//           width={321}
//           className="h-full w-full object-cover object-top"
//           alt="fundraise-banner-example.jpg"
//         />
//       </div>

//       <h3 className="text-balance text-2xl font-bold text-dark md:text-3xl">
//         JOIN GOV. OSAZE TO PUT SMILES ON THE FACES OF 1000 KIDS FOR HIS BIRTHDAY
//       </h3>

//       <hr className="my-3 border border-textcolor/50" />

//       <p className="font-medium text-dark">
//         <Link className="text-primary" href={'#'}>
//           Big Minister Testimony
//         </Link>{' '}
//         Created this fundraising campaign
//       </p>

//       <div className="mt-3 flex grid-cols-10 flex-wrap items-center justify-between gap-8 gap-y-4 rounded-lg bg-complementary px-3 py-2 text-sm lg:grid">
//         <div className="col-span-6 flex flex-col justify-between gap-4">
//           <div className="flex items-center gap-2 font-semibold">
//             <p>$58,046 Raised</p>
//             <p>•</p>
//             <p className="font-normal">End Date: 22nd Sept 2026</p>
//           </div>
//           <div className="flex items-center gap-2 font-semibold">
//             <p>
//               $Goal: <span className="text-primary">$58,046</span>
//             </p>
//             <p>•</p>
//             <p className="font-normal">100k+ Donors</p>
//           </div>
//         </div>
//         <div className="col-span-4 flex h-full flex-col md:w-full">
//           {/* PROGRESS BAR CIRCLE  */}
//           <div className="block md:hidden">
//             <PercentageCircle progress={20} />
//           </div>

//           {/* PROGRESS BAR TUBE  */}
//           <div className="hidden md:block">
//             <p className="mb-1 text-sm font-semibold text-primary">20%</p>
//             <PercentageBar value={20} className="h-4" />
//             <div className="mt-1 flex items-center justify-between">
//               <small>0%</small>
//               <small>100%</small>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="my-4 flex w-fit items-center justify-center gap-2 rounded-md border border-primary bg-white px-4 py-1.5 text-sm font-semibold text-primary">
//         <Icon icon={'mdi:tag'} className="text-xl" />
//         <Link href={'/more-campaigns'}>Send Children Back to School</Link>
//       </div>

//       <hr className="my-3 border border-textcolor/50" />

//       <p className="text-sm">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sunt, ipsam corrupti, eaque
//         incidunt, quos a numquam officiis molestias tempore fuga quidem. Quaerat non quasi nam vel
//         dolorum fuga voluptatibus officia beatae iure perspiciatis nostrum delectus sapiente fugit
//         magnam, incidunt eligendi quia quas. At id fuga facere eos itaque facilis totam, aperiam
//         doloremque reiciendis ipsa tempora molestiae optio repellat, adipisci nemo illo error fugiat
//         repudiandae quas pariatur in sit voluptate delectus? Molestias, totam ullam est earum
//         repudiandae ratione ipsam animi eius reprehenderit deserunt? Consectetur facere obcaecati ad
//         praesentium sint? Quae quidem pariatur quis vitae reiciendis inventore iusto, modi deleniti
//         velit.
//       </p>

//       <div className="mt-6 flex items-center gap-4">
//         <button onClick={() => console.log()} className="btn-primary mt-5 w-fit !px-10">
//           Publish Campaign
//         </button>
//         <button onClick={() => console.log()} className="btn-white mt-5 w-fit !px-10">
//           Save as Draft
//         </button>
//       </div>
//     </div>
//   )
// }

// import AvatarCard from '@/components/avatar-card'
