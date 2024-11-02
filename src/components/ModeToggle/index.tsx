import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useColorScheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event: SelectChangeEvent) => {
    setMode(event.target.value as 'light' | 'dark' | 'system')
  }

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: '120px',
        '& label': { color: 'customText.primary' },
        '& input': { color: 'customText.primary' },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'customText.primary'
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': { borderColor: 'customText.primary' },
          '&:hover fieldset': { borderColor: 'customText.primary' },
          color: 'customText.primary'
        },
        '& label.Mui-focused': { color: 'customText.primary' }
      }}
    >
      <InputLabel id="demo-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="demo-select-dark-light-mode"
        id="demo-select-small"
        value={mode}
        label="Mode"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '.MuiSvgIcon-root': {
            color: 'customText.primary'
          }
        }}
        onChange={handleChange}
      >
        <MenuItem value={'light'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon fontSize="small" />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
