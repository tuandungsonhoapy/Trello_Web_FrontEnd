import axiosInstance from '@/apis/apiConfig'

export const createCardAPI = async (data: {
  boardId: string
  columnId: string
  title: string
}) => {
  const response = await axiosInstance.post('/cards', data)
  console.log('response createCardAPI', response)
  return response.data
}
