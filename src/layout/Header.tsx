import { Box } from '@mui/material'
import ModeToggle from '../components/ModeToggle'

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) => theme.trelloCustom.headerHeight,
        alignItems: 'center',
        backgroundColor: 'primary.main',
        width: '100%'
      }}
    >
      <div>Header</div>
      <ModeToggle />
    </Box>
  )
}

export default Header
