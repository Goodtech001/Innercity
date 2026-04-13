/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/utils/axios'
import kingsChatWebSdk from 'kingschat-web-sdk'
import { IProfileRes } from '@/types'
import { baseUrl, kingsChatClientId } from '@/constants'
import { encryptClient } from "@/utils/crypt.client"

export const postLoginService = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${baseUrl}/auth/login`, credentials)
  const res: IProfileRes = response.data

  if (response.status < 200 || response.status >= 300) {
    const errorMessage = response?.data?.message || response.data || 'Something went wrong'
    throw new Error(errorMessage)
  }
  return res
}

export const postLogoutService = async () => {
  const response = await axios.post(`${baseUrl}/auth/signout`)

  if (response.status < 200 || response.status >= 300) {
    const errorMessage =
      response.data?.error?.message ||
      response.data?.message ||
      'Something went wrong'

    throw new Error(errorMessage)
  }

  sessionStorage.clear()

  return response.data
}


// ---------------- GOOGLE
export const loginWithGoogle = () => {
  window.location.href =
   "https://fundraise-api.onrender.com/api/v1/auth/google"
}

export const postRegisterService = async (credentials: {
  fullname: string
  email: string
  password: string
  telephone?: string
  birthday?: string
}) => {
  const response = await axios.post(`${baseUrl}/auth/register`, credentials)
  const res: IProfileRes = response.data

  if (response.status < 200 || response.status >= 300) {
    const errorMessage = response?.data?.message || response.data || 'Something went wrong'
    throw new Error(errorMessage)
  }

  return res
}

// export const loginWithKingsChat = async () => {
//   console.log("Starting KingsChat login")

//   const res = await kingsChatWebSdk.login({
//     scopes: ["profile"],
//     clientId: kingsChatClientId,
//   })

//   console.log("KC SDK RESULT:", res)

//   const profile = await getKingChatProfile({
//     accessToken: res.accessToken,
//     refreshToken: res.refreshToken,
//   })

//   console.log("Backend profile:", profile)

//   // 👇 ADD THIS
//   if (!profile) {
//     console.log("Profile is empty ❌")
//     return null
//   }

//   console.log("Saving to sessionStorage ✅")

//   sessionStorage.setItem(
//     "course-training-profile",
//     JSON.stringify(profile)
//   )

//   return profile
// }
export const loginWithKingsChat = async () => {
  try {

    const kcLogin = await kingsChatWebSdk.login({
      scopes: ['profile', 'message', 'conference_call', 'send_chat_message'],
      clientId: kingsChatClientId,
    })

    const profile = await getKingChatProfile({
      accessToken: kcLogin.accessToken,
      refreshToken: kcLogin.refreshToken
    })

    return profile

  } catch (error) {
    console.log("KingsChat login error:", error)
    throw error
  }
}

export const getKingChatProfile = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string
  refreshToken: string
}) => {
  const response = await axios.post(`${baseUrl}/auth/kingschat`, {
    accessToken,
    refreshToken,
  })
  const res: IProfileRes = response.data
  sessionStorage.setItem('course-training-profile', encryptClient(res))

  if (response.status < 200 || response.status >= 300) {
    const errorMessage = response?.data?.message || response.data || 'Something went wrong'
    throw new Error(errorMessage)
  }

  return res
}

export const uploadFileService = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", "testimonial")

  const res = await axios.post(
    `${baseUrl}/uploads`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return res.data
}

export const createTestimonialService = async (payload: any) => {
  const response = await axios.post("/testimonials", payload)
  return response.data
}

export const getTestimonialsService = async () => {
  const res = await axios.get(
    `${baseUrl}/testimonials`
  )

  return res.data
}

export const deleteTestimonialService = async (id: number) => {
  const response = await axios.delete(
    `${baseUrl}/testimonials/${id}`,
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(
            sessionStorage.getItem("course-training-profile") || "{}"
          )?.token
        }`,
      },
    }
  )

  return response.data
}



const getToken = () => {
  if (typeof window === "undefined") return null
  return JSON.parse(
    sessionStorage.getItem("course-training-profile") || "{}"
  )?.token
}

export const getUsersService = async () => {
  const response = await axios.get(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return response.data
}

export const deleteUserService = async (id: number) => {
  const response = await axios.delete(
    `${baseUrl}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

  return response.data
}
export const getAllCategoryService = async () => {
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(
          sessionStorage.getItem('course-training-profile') || '{}'
        )?.token
      : null

  const res = await fetch(
    `${baseUrl}/category`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  return res.json()
}
export const createCategoryService = async (data: any) => {
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(
          sessionStorage.getItem('course-training-profile') || '{}'
        )?.token
      : null

  const res = await fetch(
    `${baseUrl}/category`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Create failed')
  }

  return result
}
export const deleteCategoryService = async (id: number) => {
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(
          sessionStorage.getItem('course-training-profile') || '{}'
        )?.token
      : null

  const res = await fetch(
    `${baseUrl}/category/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Delete failed')
  }

  return res.json()
}
export const updateCategoryService = async (
  id: number,
  data: any
) => {
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(
          sessionStorage.getItem('course-training-profile') || '{}'
        )?.token
      : null

  const res = await fetch(
    `${baseUrl}/category/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || 'Update failed')
  }

  return result
}


export const getAllCampaignsService = async () => {
  const token =
    typeof window !== 'undefined'
      ? JSON.parse(
          sessionStorage.getItem('course-training-profile') || '{}'
        )?.token
      : null

  const res = await fetch(
    `${baseUrl}/camapign`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch campaigns')
  }

  return res.json()
}

// auth.service.ts

// Create a new fundraising campaign
export const createCampaignService = async (data: any) => {
  const token = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('course-training-profile') || '{}')?.token
    : null;

  const res = await fetch(`${baseUrl}/campaigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || 'Create campaign failed');
  }
  return result;
};

// (Optional) If you have an endpoint to upload images first:
export const uploadImageService = async (file: File) => {
  const token = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('course-training-profile') || '{}')?.token
    : null;
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${baseUrl}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || 'Image upload failed');
  }
  return result; // Assuming result contains { id: number, url: string, ... }
};

export const sendManualEmailService = async (payload: {
  to: string | string[]
  subject: string
  message: string
}) => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/mailing/send-manual`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: payload.to,
      subject: payload.subject,
      template: 'generic-manual-email',
      variables: {
        message: payload.message,
      },
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to send email')
  }

  return data
}


// const getKingChatProfile = async ({
//   accessToken,
//   refreshToken,
// }: {
//   accessToken: string
//   refreshToken: string
// }) => {
//   https://connect.kingsch.at/api/profile
//   axios
//     .get('https://connect.kingsch.at/developer/api/profile', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     .then((response) => {
//       console.log(response.data, refreshToken)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
