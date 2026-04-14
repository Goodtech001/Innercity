import axios from "axios"

const instance = axios.create({
  baseURL: 'https://fundraise-api.theinnercitymission.tv/api/v1',
})

instance.interceptors.request.use((config) => {
  const stored = sessionStorage.getItem("course-training-profile")

  if (stored) {
    const parsed = JSON.parse(stored)
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`
    }
  }

  return config
})

export default instance