import axios from 'axios'
import { API_ROOT } from '@/utils/constants'

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 10000
})

// Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu cần
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Xử lý lỗi request

    return Promise.reject(error)
  }
)

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    return response
  },
  (error) => {
    // Xử lý lỗi response
    if (error.response && error.response.status === 401) {
      // Xử lý khi token hết hạn
      localStorage.removeItem('accessToken')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
