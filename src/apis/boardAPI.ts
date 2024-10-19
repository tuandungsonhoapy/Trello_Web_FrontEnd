import axiosInstance from '@/apis/apiConfig'

export const getBoardDetailsAPI = async (boardId: string) => {
  const response = await axiosInstance.get(`/boards/${boardId}`)
  console.log('response: ', response)
  return response.data
}
