import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined'
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import * as React from 'react'
import { useState, useRef } from 'react'
import Menu from '@mui/material/Menu'
import ListCards from '@/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards'
import { columnInterface } from '@/interface/board-interface'
import { mapOrder } from '@/utils/sort'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FieldErrors, useForm } from 'react-hook-form'
import { cardSchema, CardSchemaType } from '@/utils/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { InputAdornment, TextField } from '@mui/material'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

function Column({ column }: { column: columnInterface }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const dndKitStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [isAddingCard, setIsAddingCard] = useState<boolean>(false)
  const [cardTitle, setCardTitle] = useState<string>('')
  const textFieldRef = useRef<HTMLInputElement>(null)

  // * React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<CardSchemaType>({
    resolver: zodResolver(cardSchema)
  })

  const onSubmit = (data: CardSchemaType) => {
    console.log('data:', data)
    toggleAddCard()
    setCardTitle('')
  }

  const onError = (errors: FieldErrors) => {
    if (errors.title)
      if (typeof errors.title?.message === 'string') {
        toast.error(errors.title.message)
      }
  }

  const toggleAddCard = () => {
    setIsAddingCard(!isAddingCard)
    clearErrors()
  }

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div ref={setNodeRef} {...attributes} style={dndKitStyles}>
      <Box
        {...listeners}
        sx={{
          minWidth: '280px',
          maxWidth: '280px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${
            theme.trelloCustom.boardContentHeight
          } - 
          ${theme.spacing(3)})`
        }}
      >
        {/* Column Header */}
        <Box
          sx={{
            height: (theme) => theme.trelloCustom.columnHeaderHeight,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title={'more options'}>
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-title' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: 'text.primary', cursor: 'pointer' }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-title"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown"'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Column Content */}
        <ListCards
          cards={mapOrder(
            column?.cards || [],
            column?.cardOrderIds || [],
            '_id'
          )}
        />
        {/* Column Footer */}
        <Box
          sx={{
            height: (theme) => theme.trelloCustom.columnFooterHeight,
            px: '12px'
          }}
        >
          {!isAddingCard ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <Button
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? 'white' : 'black'
                }}
                startIcon={<AddCardOutlinedIcon />}
                onClick={toggleAddCard}
              >
                Add new card
              </Button>
              <Tooltip title={'more options'}>
                <DragHandleOutlinedIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <form
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <TextField
                  sx={{
                    '& label': { color: 'constrastMode.main' },
                    '& input': { color: 'constrastMode.main' },
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
                  size="small"
                  label="Card Title"
                  {...register('title')}
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  type="text"
                  data-no-dnd="true"
                  inputRef={textFieldRef}
                  autoFocus
                  error={errors.title ? true : false}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <HighlightOffOutlinedIcon
                          fontSize="small"
                          sx={{
                            color: cardTitle
                              ? 'constrastMode.main'
                              : 'transparent',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setCardTitle('')
                            textFieldRef.current?.focus()
                          }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  variant="contained"
                  data-no-dnd="true"
                  size="small"
                  sx={{
                    color: 'customText.primary',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? '#053bb0' : '#1e272e',
                    boxShadow: 'none',
                    height: '37px',
                    '&:hover': {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.trelloCustom.bgColor_Header_Light
                          : theme.trelloCustom.bgColor_Header_Dark
                    }
                  }}
                  type="submit"
                >
                  Add
                </Button>
                <HighlightOffOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: 'constrastMode.main',
                    cursor: 'pointer'
                  }}
                  onClick={toggleAddCard}
                />
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
