import { useEffect } from 'react'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { boardId } from '@/utils/constants'
import { getBoardDetailsAPI } from '@/apis/boardAPI'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setActiveBoard } from '@/redux/boardsSlice'
import { Box, CircularProgress, Typography } from '@mui/material'

function Board() {
  const board = useAppSelector((state) => state.boards.activeBoard)

  const dispatch = useAppDispatch()

  console.log('Board Content re-rendered: ', board)

  useEffect(() => {
    getBoardDetailsAPI(boardId)
      .then((data) => {
        dispatch(setActiveBoard(data))
      })
      .catch((error) => {
        console.log('error: ', error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: (theme) => theme.trelloCustom.contentLayoutHeight
        }}
      >
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
        />
        <Typography
          variant="h6"
          sx={{
            marginTop: '8px'
          }}
        >
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <>
      {board && (
        <>
          <BoardBar board={board} />
          <BoardContent board={board} />
        </>
      )}
    </>
  )
}

export default Board
