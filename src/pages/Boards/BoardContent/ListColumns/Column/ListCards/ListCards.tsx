import Box from '@mui/material/Box'
import Card from '@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'

function ListCards() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: '0 5px',
        m: '0 5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - 
            ${theme.spacing(2)} - 
            ${theme.trelloCustom.columnHeaderHeight} - 
            ${theme.trelloCustom.columnFooterHeight})`
      }}
    >
      <Card />
      <Card />
      <Card />
    </Box>
  )
}

export default ListCards
