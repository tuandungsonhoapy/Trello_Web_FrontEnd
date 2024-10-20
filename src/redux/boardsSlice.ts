import { boardInterface } from '@/interface/board-interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BoardState {
  boards: boardInterface[]
  activeBoard: boardInterface | null
}

const initialState: BoardState = {
  boards: [],
  activeBoard: null
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    getBoards(state, action) {
      state.boards = action.payload
    },
    getActiveBoard(state, action) {
      state.activeBoard = action.payload
    }
  }
})

export const { getBoards, getActiveBoard } = boardsSlice.actions
export default boardsSlice.reducer
