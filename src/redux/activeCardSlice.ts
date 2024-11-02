import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cardInterface } from '@/interface/board-interface'

export interface cardSliceInterface {
  activeCard: cardInterface | null
  isShowActiveCard: boolean
}

const initialState: cardSliceInterface = {
  activeCard: null,
  isShowActiveCard: false
}

const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    clearActiveCard: (state) => {
      state.activeCard = null
      state.isShowActiveCard = false
    },
    showActiveCard: (state) => {
      state.isShowActiveCard = true
    },
    setActiveCard: (state, action: PayloadAction<cardInterface>) => {
      if (state.activeCard) {
        state.activeCard = {
          ...state.activeCard,
          ...action.payload
        }
      } else {
        state.activeCard = action.payload
      }
    }
  }
})

export const { clearActiveCard, setActiveCard, showActiveCard } =
  activeCardSlice.actions

export default activeCardSlice.reducer
