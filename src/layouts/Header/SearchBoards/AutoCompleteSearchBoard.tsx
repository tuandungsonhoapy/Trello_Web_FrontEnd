import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { getBoardsAPI } from '@/apis/boardAPI'
import { boardInterface } from '@/interface/board-interface'
import { useDebounce } from '@/hooks/useDebounce'

/**
 * https://mui.com/material-ui/react-autocomplete/#asynchronous-requests
 */
function AutoCompleteSearchBoard() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const [boards, setBoards] = useState<Array<boardInterface> | null>(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Khi đóng cái phần list kết quả lại thì đồng thời clear cho boards về null
    if (!open) {
      setBoards(null)
    }
  }, [open])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputSearchChange = (event: any) => {
    const searchValue = event.target?.value
    if (!searchValue) return

    // Dùng createSearchParams của react-router-dom để tạo một cái searchPath chuẩn với q[title] để gọi lên API
    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`

    // Call API
    setLoading(true)
    getBoardsAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || [])
      })
      .finally(() => setLoading(false))
  }
  const debounceSearchBoard = useDebounce(handleInputSearchChange, 800)

  const handleSelectedBoard = (
    _event: React.SyntheticEvent<Element, Event>,
    selectedBoard: boardInterface | null
  ) => {
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`)
    }
  }

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      // Cái text này hiện ra khi boards là null hoặc sau khi đã fetch boards nhưng rỗng - không có kết quả
      noOptionsText={!boards ? 'Type to search board...' : 'No board found!'}
      // Cụm này để handle việc đóng mở phần kết quả tìm kiếm
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionLabel={(board) => board.title}
      options={boards || []}
      // Link chi tiết: https://stackoverflow.com/a/65347275/8324172
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      onInputChange={debounceSearchBoard}
      onChange={handleSelectedBoard}
      // Render ra cái thẻ input để nhập nội dung tìm kiếm
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            '& label': { color: 'customText.primary' },
            '& input': { color: 'customText.primary' },
            '& label.Mui-focused': { color: 'customText.primary' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'customText.primary' },
              '&:hover fieldset': { borderColor: 'customText.primary' },
              '&.Mui-focused fieldset': { borderColor: 'customText.primary' }
            },
            '.MuiSvgIcon-root': { color: 'customText.primary' }
          }}
        />
      )}
    />
  )
}

export default AutoCompleteSearchBoard
