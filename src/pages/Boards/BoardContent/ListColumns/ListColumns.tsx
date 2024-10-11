import Box from '@mui/material/Box'
import Column from '@/pages/Boards/BoardContent/ListColumns/Column/Column'
import { Button } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'

function ListColumns() {
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      <Column />
      <Column />

      {/* Add new column */}
      <Box
        sx={{
          minWidth: 180,
          maxWidth: 180,
          mx: 2,
          height: 'fit-content',
          borderRadius: '6px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ffffff3d'
        }}
      >
        <Button
          sx={{
            width: '100%'
          }}
          startIcon={<PostAddIcon />}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
