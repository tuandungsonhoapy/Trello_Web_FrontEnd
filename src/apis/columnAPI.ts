import axiosInstance from '@/apis/apiConfig'
import { columnInterface } from '@/interface/board-interface'

export const createColumnAPI = async (data: {
  boardId: string
  title: string
}) => {
  const response = await axiosInstance.post('/columns', data)

  return response.data
}

export const updateColumnAPI = async (
  columnId: string,
  data: columnInterface
) => {
  const response = await axiosInstance.put(`/columns/${columnId}`, data)

  return response.data
}

export const deleteColumnAPI = async (columnId: string) => {
  const response = await axiosInstance.delete(`/columns/${columnId}`)

  return response.data
}
