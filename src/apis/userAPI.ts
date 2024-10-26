import axiosInstance from '@/apis/apiConfig'
import { toast } from 'react-toastify'

export const registerUserAPI = async (userData: {
  email: string
  password: string
}) => {
  const response = await axiosInstance.post('/users/register', userData)
  toast.success('User registered successfully')
  return response.data
}

export const verifyUserAPI = async (data: { email: string; token: string }) => {
  const response = await axiosInstance.put('/users/verify', data)
  toast.success('User verified successfully')
  return response.data
}

export const loginUserAPI = async (data: {
  email: string
  password: string
}) => {
  const response = await axiosInstance.post('/users/login', data)

  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.get('/users/refresh-token')
  return response.data
}
