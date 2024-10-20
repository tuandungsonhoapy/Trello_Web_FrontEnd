import axiosInstance from '@/apis/apiConfig'
import { cardInterface } from '@/interface/board-interface'

export const createCardAPI = async (card: cardInterface) => {
  const response = await axiosInstance.post('/cards', card)
  console.log('response createCardAPI', response)
  return response.data
}
