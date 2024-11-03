import axiosInstance from '@/apis/apiConfig'
import { incomingMemberInterface } from '@/components/Modal/ActiveCard/ActiveCard'
import { cardInterface } from '@/interface/board-interface'

export const createCardAPI = async (data: {
  boardId: string
  columnId: string
  title: string
}) => {
  const response = await axiosInstance.post('/cards', data)

  return response.data
}

export const updateCardAPI = async (
  cardId: string,
  data: cardInterface | FormData | incomingMemberInterface
) => {
  const response = await axiosInstance.put(`/cards/${cardId}`, data)

  return response.data
}

export const deleteCardAPI = async (cardId: string) => {
  const response = await axiosInstance.delete(`/cards/${cardId}`)

  return response.data
}
