import {
  boardInterface,
  cardInterface,
  columnInterface
} from '@/interface/board-interface'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generatePlaceholderCard } from '@/utils/formatter'
import { isEmpty } from 'lodash'
import { mapOrder } from '@/utils/sort'
import axiosInstance from '@/apis/apiConfig'

export interface BoardState {
  boards: boardInterface[]
  activeBoard: boardInterface | null
}

const initialState: BoardState = {
  boards: [],
  activeBoard: null
}

export const getBoardDetailsAPI = createAsyncThunk(
  'boards/getBoardDetailsAPI',
  async (boardId: string) => {
    const response = await axiosInstance.get(`/boards/${boardId}`)
    return response.data
  }
)

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
    },
    deleteColumn(state, action: PayloadAction<string>) {
      if (state.activeBoard) {
        state.activeBoard.columns = state.activeBoard.columns?.filter(
          (column) => column._id !== action.payload
        )
        state.activeBoard.columnOrderIds =
          state.activeBoard.columnOrderIds?.filter(
            (id) => id !== action.payload
          )
      }
    },
    updateCard(state, action: PayloadAction<cardInterface>) {
      const columnContainCard = state.activeBoard?.columns?.find(
        (column) => column._id === action.payload.columnId
      )

      if (columnContainCard) {
        const cardIndex = columnContainCard.cards?.findIndex(
          (card) => card._id === action.payload._id
        )

        if (
          columnContainCard.cards &&
          cardIndex !== undefined &&
          cardIndex !== -1
        ) {
          columnContainCard.cards[cardIndex] = {
            ...columnContainCard.cards[cardIndex],
            ...action.payload
          } as cardInterface
        }
      }
    },
    deleteCard(state, action: PayloadAction<cardInterface>) {
      const columnContainCard = state.activeBoard?.columns?.find(
        (column) => column._id === action.payload.columnId
      )

      if (columnContainCard) {
        columnContainCard.cards = columnContainCard.cards?.filter(
          (card) => card._id !== action.payload._id
        )
        columnContainCard.cardOrderIds = columnContainCard.cardOrderIds?.filter(
          (id) => id !== action.payload._id
        )
        if (isEmpty(columnContainCard.cards)) {
          columnContainCard.cards = [generatePlaceholderCard(columnContainCard)]
          columnContainCard.cardOrderIds = [columnContainCard.cards[0]._id]
        }
      }
    },
    clearActiveBoard(state) {
      state.activeBoard = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getBoardDetailsAPI.fulfilled,
      (state, action: PayloadAction<boardInterface>) => {
        state.activeBoard = action.payload

        if (!state.activeBoard.owners) state.activeBoard.owners = []
        if (!state.activeBoard.members) state.activeBoard.members = []

        state.activeBoard.FE_allUsers = state.activeBoard.owners.concat(
          state.activeBoard.members
        )

        // * Sort column by columnOrderIds
        state.activeBoard.columns = mapOrder(
          state.activeBoard.columns || [],
          state.activeBoard.columnOrderIds || [],
          '_id'
        )

        // * Add placeholder card if column is empty
        state.activeBoard.columns = state.activeBoard.columns?.map((column) => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [column.cards[0]._id]
          } else {
            // * Sort card by cardOrderIds
            column.cards = mapOrder(
              column.cards || [],
              column.cardOrderIds || [],
              '_id'
            )
          }
          return column
        })
      }
    )
  }
})

export const {
  setBoards,
  setActiveBoard,
  addNewColumn,
  addNewCard,
  updateBoard,
  updateColumn,
  deleteColumn,
  updateCard,
  deleteCard,
  clearActiveBoard
} = boardsSlice.actions

export default boardsSlice.reducer
