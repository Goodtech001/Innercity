import { baseUrl } from '@/constants'
import axios from 'axios'

export interface GetResourcesServiceResponse {
  id: number
  name: string
  description: string
  asset_id: number
  asset: {
    id: number
    url: string
    type: string // "e-card", etc.
    resourceType: string // "image", "video"
  }
}

export const getResourcesService = async (): Promise<GetResourcesServiceResponse[]> => {
  const response = await axios.get(`${baseUrl}/resources`)
  // Based on your JSON, it's an array directly or inside response.data
  const data = response.data?.data || response.data
  return data
}