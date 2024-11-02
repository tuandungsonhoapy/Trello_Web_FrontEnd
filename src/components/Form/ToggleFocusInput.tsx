// TrungQuanDev: https://youtube.com/@trungquandev
import { useState } from 'react'
import TextField from '@mui/material/TextField'

interface ToggleFocusInputProps {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChangedValue: (value: string) => void
  inputFontSize?: string
}
// Controlled Input trong MUI: https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled
function ToggleFocusInput({
  value,
  onChangedValue,
  inputFontSize = '16px',
  ...props
}: ToggleFocusInputProps) {
  const [inputValue, setInputValue] = useState(value)

  const triggerBlur = () => {
    setInputValue(inputValue.trim())

    // Nếu giá trị không có gì thay đổi hoặc Nếu user xóa hết nội dung thì set lại giá trị gốc ban đầu theo value từ props và return luôn không làm gì thêm
    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value)
      return
    }

    onChangedValue(inputValue)
  }

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value)
      }}
      onBlur={triggerBlur}
      {...props}
      sx={{
        '& label': {},
        '& input': { fontSize: inputFontSize, fontWeight: 'bold' },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root:hover': {
          borderColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#33485D' : 'white',
          '& fieldset': { borderColor: 'primary.main' }
        },
        '& .MuiOutlinedInput-input': {
          px: '6px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      }}
    />
  )
}

export default ToggleFocusInput
