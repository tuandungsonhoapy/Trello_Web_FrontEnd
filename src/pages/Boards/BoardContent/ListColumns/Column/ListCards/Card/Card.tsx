import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card() {
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://onetech.jp/wp-content/uploads/2024/04/reactjs.png"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light'
                ? 'primary.main'
                : 'customText.primary'
          }}
          size="small"
          startIcon={<GroupIcon />}
        >
          20
        </Button>
        <Button
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light'
                ? 'primary.main'
                : 'customText.primary'
          }}
          size="small"
          startIcon={<CommentIcon />}
        >
          20
        </Button>
        <Button
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light'
                ? 'primary.main'
                : 'customText.primary'
          }}
          size="small"
          startIcon={<AttachmentIcon />}
        >
          15
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
