import axiosInstance from '@/apis/apiConfig'
import { boardInterface } from '@/interface/board-interface'

export const getBoardDetailsAPI = async (boardId: string) => {
  const response = await axiosInstance.get(`/boards/${boardId}`)
  return response.data
}

export const getBoardsAPI = async () => {
  const response = await axiosInstance.get('/boards')
  return response.data
}

export const updateBoardAPI = async (
  boardId: string,
  updateData: boardInterface
) => {
  console.log('updateData', updateData)
  const response = await axiosInstance.put(`/boards/${boardId}`, updateData)
  console.log('response updateBoardAPI', response)
  return response.data
}

export const moveCardToAnotherColumnAPI = async (data: {
  fromColumnId: string
  toColumnId: string
  cardId: string
  cardOrderIdsOfOldColumn: Array<string>
  cardOrderIdsOfNewColumn: Array<string>
}) => {
  console.log('data-moveCardToAnotherColumnAPI', data)
  const response = await axiosInstance.put('/boards/move-card', data)
  return response.data
}
