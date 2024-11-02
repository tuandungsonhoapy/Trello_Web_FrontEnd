import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '@/apis/apiConfig'
import { invitationInterface } from '@/interface/invitation-interface'

interface NotificationsState {
  notifications: Array<invitationInterface> | null
}

const initialState: NotificationsState = {
  notifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitations',
  async () => {
    const response = await axiosInstance.get('/invitations')
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitation',
  async (data: { invitationId: string; status: string }) => {
    const response = await axiosInstance.put(
      `/invitations/board/${data.invitationId}`,
      { status: data.status }
    )
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = null
    },
    setNotification: (state, action) => {
      state.notifications = action.payload
    },
    addNotification: (state, action) => {
      state.notifications?.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
        state.notifications = Array.isArray(action.payload)
          ? action.payload.reverse()
          : []
      })
      .addCase(
        updateBoardInvitationAPI.fulfilled,
        (state, action: PayloadAction<invitationInterface>) => {
          const getInvitation = state.notifications?.find(
            (invitation) => invitation._id === action.payload._id
          )

          if (getInvitation) {
            getInvitation.boardInvitation = action.payload.boardInvitation
          }
        }
      )
  }
})

export const { clearNotifications, setNotification, addNotification } =
  notificationsSlice.actions

export default notificationsSlice.reducer
