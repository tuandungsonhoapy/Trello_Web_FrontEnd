import axiosInstance from '@/apis/apiConfig'
import { columnInterface } from '@/interface/board-interface'

export const createColumnAPI = async (data: {
  boardId: string
  title: string
}) => {
  const response = await axiosInstance.post('/columns', data)
  console.log('response createColumnAPI', response)
  return response.data
}

export const updateColumnAPI = async (
  columnId: string,
  data: columnInterface
) => {
  console.log('data-updateColumnAPI', data)
  const response = await axiosInstance.put(`/columns/${columnId}`, data)
  console.log('response updateColumnAPI', response)
  return response.data
}
