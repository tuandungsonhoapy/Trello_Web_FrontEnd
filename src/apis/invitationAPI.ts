import axiosInstance from '@/apis/apiConfig'

export const inviteUserToBoardAPI = async (data: {
  boardId: string
  inviteeEmail: string
}) => {
  const response = await axiosInstance.post('/invitations/board', data)

  return response.data
}
