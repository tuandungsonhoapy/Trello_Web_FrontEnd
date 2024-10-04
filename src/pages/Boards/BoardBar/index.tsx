import Box from '@mui/material/Box'

const BoardBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) => theme.trelloCustom.boardBarHeight,
        alignItems: 'center',
        backgroundColor: 'secondary.main',
        width: '100%'
      }}
    >
      <div>Board bar</div>
    </Box>
  )
}

export default BoardBar
