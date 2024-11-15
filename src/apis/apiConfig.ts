import axios from 'axios'
import { API_ROOT } from '@/utils/constants'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '@/utils/formatter'
import { refreshTokenAPI } from '@/apis/userAPI'
import { handleUnauthenticatedAPI, logoutUserAPI } from '@/redux/authSlice'
import { Store, Dispatch } from 'redux'
import { AppDispatch } from '@/redux/store'

let reduxStore: Store & { dispatch: Dispatch }

export const injectStore = (store: Store) => {
  reduxStore = store
}

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 1000 * 60 * 5
})

axiosInstance.defaults.withCredentials = true

// Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshTokenRequest: Promise<any> | null = null

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    interceptorLoadingElements(false)
    return response
  },
  async (error) => {
    // Xử lý lỗi response
    interceptorLoadingElements(false)

    // * Lỗi 401: Thực hiện logout
    if (error.response?.status === 401) {
      ;(reduxStore.dispatch as AppDispatch)(handleUnauthenticatedAPI())
    }

    const originalRequest = error.config
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!refreshTokenRequest) {
        refreshTokenRequest = refreshTokenAPI()
          .then((res) => {
            return res.accessToken
          })
          .catch((error) => {
            ;(reduxStore.dispatch as AppDispatch)(logoutUserAPI())
            return Promise.reject(error)
          })
          .finally(() => {
            refreshTokenRequest = null
          })
      }

      await refreshTokenRequest
      return await axiosInstance(originalRequest)
    }

    let errorMessage = error.message
    if (
      error.response?.data?.message &&
      !error.response?.data?.message.includes('jwt expired')
    ) {
      errorMessage = error.response.data.message
    }

    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
