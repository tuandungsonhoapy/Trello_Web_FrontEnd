import Box from '@mui/material/Box'
import Card from '@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'
import { cardInterface } from '@/interface/board-interface'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }: { cards: Array<cardInterface> }) {
  const renderCards = () => {
    return cards.map((card) => <Card key={card._id} card={card} />)
  }

  return (
    <SortableContext
      items={cards.map((card) => card._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px',
          m: '0 5px',
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) => `calc(${
            theme.trelloCustom.boardContentHeight
          } - 
            ${theme.spacing(2)} - 
            ${theme.trelloCustom.columnHeaderHeight} - 
            ${theme.trelloCustom.columnFooterHeight})`
        }}
      >
        {renderCards()}
      </Box>
    </SortableContext>
  )
}

export default ListCards
