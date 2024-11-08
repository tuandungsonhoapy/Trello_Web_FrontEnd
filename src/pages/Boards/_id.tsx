import { useEffect } from 'react'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'

import { getBoardDetailsAPI } from '@/redux/boardsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '@/components/Loading/LoadingSpinner'
import ActiveCard from '@/components/Modal/ActiveCard/ActiveCard'
import { socketIoInstance } from '@/socket'
import { boardInterface } from '@/interface/board-interface'
import { toast } from 'react-toastify'

function Board() {
  const board = useAppSelector((state) => state.boards.activeBoard)

  const { boardId } = useParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardDetailsAPI(boardId))
        .unwrap()
        .catch(() => {
          navigate('/boards')
        })
    }
  }, [boardId, dispatch, navigate])

  useEffect(() => {
    const handleRemoveUserFromBoard = (board: boardInterface) => {
      if (boardId === board._id) {
        navigate('/boards')
        toast.error('You have been removed from this board!')
      }
    }

    socketIoInstance.on('be-remove-user-from-board', handleRemoveUserFromBoard)

    return () => {
      socketIoInstance.off(
        'be-remove-user-from-board',
        handleRemoveUserFromBoard
      )
    }
  }, [boardId, navigate])

  if (!board) {
    return <LoadingSpinner />
  }

  return (
    <>
      {board && (
        <>
          <ActiveCard />
          <BoardBar board={board} />
          <BoardContent board={board} />
        </>
      )}
    </>
  )
}

export default Board
