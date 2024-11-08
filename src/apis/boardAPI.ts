import axiosInstance from '@/apis/apiConfig'
import { boardInterface } from '@/interface/board-interface'

export const getBoardDetailsAPI = async (boardId: string) => {
  const response = await axiosInstance.get(`/boards/${boardId}`)
  return response.data
}

export const getBoardsAPI = async (searchPath: string) => {
  const response = await axiosInstance.get(`/boards${searchPath}`)
  return response.data
}

export const updateBoardAPI = async (
  boardId: string,
  updateData: boardInterface
) => {
  const response = await axiosInstance.put(`/boards/${boardId}`, updateData)

  return response.data
}

export const moveCardToAnotherColumnAPI = async (data: {
  fromColumnId: string
  toColumnId: string
  cardId: string
  cardOrderIdsOfOldColumn: Array<string>
  cardOrderIdsOfNewColumn: Array<string>
}) => {
  const response = await axiosInstance.put('/boards/move-card', data)
  return response.data
}

export const createBoardAPI = async (data: boardInterface) => {
  const response = await axiosInstance.post('/boards', data)
  return response.data
}

export const removeUserFromBoardAPI = async (data: {
  boardId: string
  userId: string
}) => {
  const response = await axiosInstance.put('/boards/remove-user', data)
  return response.data
}
