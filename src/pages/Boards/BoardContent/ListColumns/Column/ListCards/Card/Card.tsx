import Typography from '@mui/material/Typography'
import { Box, Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { cardInterface } from '@/interface/board-interface'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setActiveCard, showActiveCard } from '@/redux/activeCardSlice'

function Card({ card }: { card: cardInterface }) {
  const dispatch = useAppDispatch()

  const isShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    )
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })

  const dndCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const handleActiveCard = () => {
    dispatch(setActiveCard(card))
    dispatch(showActiveCard())
  }

  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '& .edit-icon': {
          display: 'none'
        },
        '&:hover': {
          borderColor: (theme) =>
            theme.palette.mode === 'light' ? 'black' : 'white',
          '& .edit-icon': {
            display: 'block'
          }
        }
        // overflow: card?.FE_PlaceholderCard ? 'hidden' : 'unset'
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={dndCardStyles}
      onClick={handleActiveCard}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title={card?.title}
        />
      )}
      <CardContent sx={{ p: 1.2, '&:last-child': { p: 1.2 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography>{card?.title}</Typography>
        </Box>
      </CardContent>
      {isShowCardActions() && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && (
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
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
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
              {card?.comments.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
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
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
