import { useState } from 'react'
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
import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField'
import { deleteCardAPI, updateCardAPI } from '@/apis/cardAPI'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { deleteCard, updateCard } from '@/redux/boardsSlice'

function Card({ card }: { card: cardInterface }) {
  const [cardTitle, setCardTitle] = useState<string | null>(null)

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

  const handleClickEditCard = () => {
    setCardTitle(card?.title || null)
  }

  const handleClickSaveCard = () => {
    if (cardTitle) {
      dispatch(
        updateCard({
          _id: card._id,
          columnId: card.columnId,
          title: cardTitle
        } as cardInterface)
      )
      setCardTitle(null)

      updateCardAPI(card._id, { title: cardTitle } as cardInterface)
    }
  }

  const handleClickDeleteCard = () => {
    dispatch(
      deleteCard({ _id: card._id, columnId: card.columnId } as cardInterface)
    )
    deleteCardAPI(card._id)
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
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title={card?.title}
        />
      )}
      <CardContent sx={{ p: 1.2, '&:last-child': { p: 1.2 } }}>
        {!cardTitle ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography>{card?.title}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                width: '28px',
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.1)'
                      : 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onClick={handleClickEditCard}
            >
              <EditIcon className="edit-icon" fontSize="small" />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            data-no-dnd="true"
          >
            <TextField
              id="outlined-multiline-static"
              label="Card Title"
              multiline
              rows={2}
              defaultValue={cardTitle}
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: 'constrastMode.main' },
                '& .MuiInputBase-input': { color: 'constrastMode.main' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'constrastMode.main'
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'constrastMode.main'
                  },
                  '&:hover fieldset': { borderColor: 'constrastMode.main' }
                },
                '& label.Mui-focused': { color: 'constrastMode.main' }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mt: 1
              }}
            >
              <Button
                variant="contained"
                sx={{ color: 'white' }}
                size="small"
                onClick={handleClickSaveCard}
              >
                save
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setCardTitle(null)}
                sx={{ color: 'white' }}
              >
                cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ color: 'white' }}
                size="small"
                onClick={handleClickDeleteCard}
              >
                delete
              </Button>
            </Box>
          </Box>
        )}
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
