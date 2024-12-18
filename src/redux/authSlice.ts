import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '@/apis/apiConfig'
import { userInterface } from '@/interface/user-interface'

export interface AuthState {
  currentUser: userInterface | null
}

const initialState: AuthState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'auth/loginUserAPI',
  async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post('/users/login', data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'auth/logoutUserAPI',
  async () => {
    const response = await axiosInstance.delete('/users/logout')
    return response.data
  }
)

export const handleUnauthenticatedAPI = createAsyncThunk(
  'auth/handleUnauthenticatedAPI',
  async () => {
    const response = await axiosInstance.delete('/users/handleUnauthenticated')
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'auth/updateUserAPI',
  async (
    data:
      | {
          current_password?: string
          new_password?: string
          displayName?: string
        }
      | FormData
  ) => {
    const response = await axiosInstance.put('/users/update', data)
    return response.data
  }
)

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<userInterface>) => {
      state.currentUser = action.payload
    },
    clearCurrentUser: (state) => {
      state.currentUser = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginUserAPI.fulfilled,
        (state, action: PayloadAction<userInterface>) => {
          state.currentUser = action.payload as userInterface
        }
      )
      .addCase(
        logoutUserAPI.fulfilled,
        (state, action: PayloadAction<{ loggedOut: boolean }>) => {
          if (action.payload.loggedOut) {
            state.currentUser = null
          }
        }
      )
      .addCase(
        updateUserAPI.fulfilled,
        (state, action: PayloadAction<userInterface>) => {
          state.currentUser = { ...state.currentUser, ...action.payload }
        }
      )
      .addCase(
        handleUnauthenticatedAPI.fulfilled,
        (state, action: PayloadAction<{ loggedOut: boolean }>) => {
          if (action.payload.loggedOut) {
            state.currentUser = null
          }
        }
      )
  }
})

export const { updateCurrentUser, clearCurrentUser } = AuthSlice.actions

export default AuthSlice.reducer
