import axiosInstance from '@/apis/apiConfig'
import { cardInterface } from '@/interface/board-interface'

export const createCardAPI = async (data: {
  boardId: string
  columnId: string
  title: string
}) => {
  const response = await axiosInstance.post('/cards', data)
  console.log('response createCardAPI', response)
  return response.data
}

export const updateCardAPI = async (cardId: string, data: cardInterface) => {
  console.log('🚀 ~ updateCardAPI ~ data:', data)
  console.log('🚀 ~ updateCardAPI ~ cardId:', cardId)

  const response = await axiosInstance.put(`/cards/${cardId}`, data)
  console.log('🚀 ~ updateCardAPI ~ response:', response)
  return response.data
}

export const deleteCardAPI = async (cardId: string) => {
  console.log('🚀 ~ deleteCardAPI ~ cardId:', cardId)
  const response = await axiosInstance.delete(`/cards/${cardId}`)
  console.log('🚀 ~ deleteCardAPI ~ response:', response)
  return response.data
}
