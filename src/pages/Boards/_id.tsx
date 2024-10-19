import { useEffect, useState } from 'react'

import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { boardInterface } from '@/interface/board-interface'
import { boardId } from '@/utils/constants'
import { getBoardDetailsAPI } from '@/apis/boardAPI'

function Board() {
  const [board, setBoard] = useState<boardInterface | null>(null)

  useEffect(() => {
    getBoardDetailsAPI(boardId)
      .then((data) => {
        console.log('data-after-get: ', data)
        setBoard(data)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }, [])

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
