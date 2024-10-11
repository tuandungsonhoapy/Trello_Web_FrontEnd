import Box from '@mui/material/Box'
import ListColumns from '@/pages/Boards/BoardContent/ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        width: '100%',
        bgcolor: (theme) => theme.palette.background.default,
        p: '6px 0'
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent
