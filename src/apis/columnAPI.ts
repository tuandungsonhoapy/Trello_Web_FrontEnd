import axiosInstance from '@/apis/apiConfig'
import { columnInterface } from '@/interface/board-interface'

export const createColumnAPI = async (column: columnInterface) => {
  const response = await axiosInstance.post('/columns', column)
  console.log('response createColumnAPI', response)
  return response.data
}
