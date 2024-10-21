import {
  boardInterface,
  cardInterface,
  columnInterface
} from '@/interface/board-interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generatePlaceholderCard } from '@/utils/formatter'
import { isEmpty } from 'lodash'
import { mapOrder } from '@/utils/sort'

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
    setBoards(state, action: PayloadAction<boardInterface[]>) {
      state.boards = action.payload
    },
    setActiveBoard(state, action: PayloadAction<boardInterface>) {
      state.activeBoard = action.payload
      state.activeBoard.columns = state.activeBoard.columns?.map((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [column.cards[0]._id]
        }
        return column
      })

      // * Sort column and card by columnOrderIds and cardOrderIds
      if (state.activeBoard?.columns) {
        state.activeBoard.columns = mapOrder(
          state.activeBoard?.columns || [],
          state.activeBoard?.columnOrderIds || [],
          '_id'
        )

        state.activeBoard.columns.forEach((column) => {
          if (column.cards)
            column.cards = mapOrder(
              column.cards || [],
              column.cardOrderIds || [],
              '_id'
            )
        })
      }
    },
    addNewColumn(state, action: PayloadAction<columnInterface>) {
      const newColumn = action.payload
      if (isEmpty(newColumn.cards)) {
        newColumn.cards = [generatePlaceholderCard(newColumn)]
        newColumn.cardOrderIds = [newColumn.cards[0]._id]
      }
      if (state.activeBoard) {
        state.activeBoard.columns = [
          ...(state.activeBoard.columns || []),
          newColumn
        ]
        state.activeBoard.columnOrderIds = [
          ...(state.activeBoard.columnOrderIds || []),
          newColumn._id
        ]
      }
    },
    addNewCard(state, action: PayloadAction<cardInterface>) {
      if (state.activeBoard) {
        const column = state.activeBoard.columns?.find(
          (column) => column._id === action.payload.columnId
        )
        if (column) {
          if (column.cards?.some((card) => card.FE_PlaceholderCard)) {
            column.cards = [action.payload]
            column.cardOrderIds = [action.payload._id]
          } else {
            column.cards = [...(column.cards || []), action.payload]
            column.cardOrderIds = [
              ...(column.cardOrderIds || []),
              action.payload._id
            ]
          }
        }
      }
    },
    updateBoard(state, action: PayloadAction<boardInterface>) {
      state.activeBoard = {
        ...state.activeBoard,
        ...action.payload
      } as boardInterface
    },
    updateColumn(state, action: PayloadAction<columnInterface>) {
      const columnIndex = state.activeBoard?.columns?.findIndex(
        (column) => column._id === action.payload._id
      )

      if (
        state.activeBoard?.columns &&
        columnIndex !== undefined &&
        columnIndex !== -1
      ) {
        state.activeBoard.columns[columnIndex] = {
          ...state.activeBoard.columns[columnIndex],
          ...action.payload
        } as columnInterface
      }
    }
  }
})

export const {
  setBoards,
  setActiveBoard,
  addNewColumn,
  addNewCard,
  updateBoard,
  updateColumn
} = boardsSlice.actions

export default boardsSlice.reducer
