import Box from '@mui/material/Box'
import Column from '@/pages/Boards/BoardContent/ListColumns/Column/Column'
import { Button, InputAdornment, TextField } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { columnInterface } from '@/interface/board-interface'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useRef, useState } from 'react'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { useForm, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { columnSchema, ColumnSchemaType } from '@/utils/validationSchemas'
import { toast } from 'react-toastify'
import { createColumnAPI } from '@/apis/columnAPI'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { addNewColumn } from '@/redux/boardsSlice'

function ListColumns({ columns }: { columns: Array<columnInterface> }) {
  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false)
  const [columnTitle, setColumnTitle] = useState<string>('')
  const textFieldRef = useRef<HTMLInputElement>(null)
  const board = useAppSelector((state) => state.boards.activeBoard)

  const dispatch = useAppDispatch()

  // * React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<ColumnSchemaType>({
    resolver: zodResolver(columnSchema)
  })

  const onSubmit = (data: ColumnSchemaType) => {
    if (board) {
      createColumnAPI({ ...data, boardId: board._id })
        .then((data) => {
          dispatch(addNewColumn(data as columnInterface))
          toast.success('Column created successfully')
        })
        .catch((error) => {
          toast.error('Column not created')
          console.log('error-after-createColumn', error)
        })
    } else {
      toast.error('Board not found')
    }

    toggleAddColumn()
    setColumnTitle('')
  }

  const onError = (errors: FieldErrors) => {
    if (errors.title)
      if (typeof errors.title?.message === 'string') {
        toast.error(errors.title.message)
      }
  }

  const toggleAddColumn = () => {
    setIsAddingColumn(!isAddingColumn)
    clearErrors()
  }

  const renderColumns = () => {
    return columns.map((column) => <Column key={column._id} column={column} />)
  }

  return (
    <SortableContext
      strategy={horizontalListSortingStrategy}
      items={columns.map((column) => column._id)}
    >
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
        {renderColumns()}

        {/* Add new column */}
        {!isAddingColumn ? (
          <Box
            sx={{
              minWidth: '240px',
              maxWidth: '240px',
              mx: 2,
              height: 'fit-content',
              borderRadius: '6px',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#333643' : '#ffffff3d'
            }}
            onClick={toggleAddColumn}
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
        ) : (
          <Box
            sx={{
              minWidth: '240px',
              maxWidth: '240px',
              mx: 2,
              p: 1,

              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#333643' : '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <TextField
                size="small"
                label="Column Title"
                {...register('title')}
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
                type="text"
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
                          color: columnTitle
                            ? 'customText.primary'
                            : 'transparent',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setColumnTitle('')
                          textFieldRef.current?.focus()
                        }}
                      />
                    </InputAdornment>
                  )
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  mt: 1
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    color: 'customText.primary',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? '#341f97' : '#1e272e',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.trelloCustom.bgColor_Header_Light
                          : theme.trelloCustom.bgColor_Header_Dark
                    }
                  }}
                  type="submit"
                >
                  Add Column
                </Button>
                <HighlightOffOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: 'customText.primary',
                    cursor: 'pointer'
                  }}
                  onClick={toggleAddColumn}
                />
              </Box>
            </form>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
