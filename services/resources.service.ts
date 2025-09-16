import axios from 'axios'

export interface GetResourcesServiceResponse {
  name: string
  type: string
  src: string
  tags: string[]
}

export const getResourcesService = async () => {
  const response = await axios.get(`https://emis-server.onrender.com/resources`)
  const res = response.data

  if (res.status < 200 || res.status >= 300) {
    const errorMessage = res.error?.message || res.message || 'Something went wrong'
    throw new Error(errorMessage)
  }

  const data: GetResourcesServiceResponse[] = res
  return data
}
