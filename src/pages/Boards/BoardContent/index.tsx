import { Box } from '@mui/material'

function BoardContent() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustom.headerHeight} - ${theme.trelloCustom.boardBarHeight})`,
        alignItems: 'center',
        backgroundColor: 'primary.main',
        width: '100%',
        bgcolor: (theme) => theme.palette.background.default
      }}
    ></Box>
  )
}

export default BoardContent
