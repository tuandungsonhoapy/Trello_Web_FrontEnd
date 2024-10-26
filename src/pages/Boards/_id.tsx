import { useEffect } from 'react'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'

import { getBoardDetailsAPI } from '@/redux/boardsSlice'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '@/components/Loading/LoadingSpinner'

function Board() {
  const board = useAppSelector((state) => state.boards.activeBoard)

  const { boardId } = useParams()

  const dispatch = useAppDispatch()

  console.log('Board Content re-rendered: ', board)

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardDetailsAPI(boardId))
    }
  }, [boardId, dispatch])

  if (!board) {
    return <LoadingSpinner />
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
