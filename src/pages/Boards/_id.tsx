import { mockData } from '@/apis/mock-data'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

function Board() {
  return (
    <>
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </>
  )
}

export default Board
