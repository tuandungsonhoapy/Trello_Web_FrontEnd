import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import ModeToggle from '@/components/ModeToggle'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '@/assets/trelloIcon.svg'
import Typography from '@mui/material/Typography'
import Workspaces from '@/layouts/Header/Menus/Workspaces'
import Recent from '@/layouts/Header/Menus/Recent'
import Starred from '@/layouts/Header/Menus/Starred'
import Templates from '@/layouts/Header/Menus/Templates'
import { Badge, Button, InputAdornment, TextField } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountMenu from '@/layouts/Header/Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import OptionMenu from '@/layouts/Header/Menus'
import CancelIcon from '@mui/icons-material/Cancel'

const Header = () => {
  const [invisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) => theme.trelloCustom.headerHeight,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        px: 2,
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => theme.palette.background.default
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AppsIcon sx={{ color: 'secondary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{ color: 'secondary.main' }}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: 'secondary.main'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            gap: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1
            }}
          >
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
          </Box>
          <Button
            sx={{
              border: 'none !important',
              '&:hover': {
                border: 'none !important', // Đảm bảo không có border khi hover
                backgroundColor: 'transparent !important' // Loại bỏ hiệu ứng background khi hover nếu cần
              }
            }}
            startIcon={<LibraryAddIcon />}
            variant="outlined"
          >
            Create
          </Button>
        </Box>
        <Box
          sx={{
            display: {
              xs: 'flex',
              md: 'none'
            },
            gap: 1
          }}
        >
          <OptionMenu />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TextField
          size="small"
          id="outlined-search"
          label="Search field"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          sx={{
            minWidth: '150px',
            maxWidth: '220px'
            // '& label': { color: 'secondary.main' },
            // '& input': { color: 'secondary.main' },
            // '& .MuiOutlinedInput-notchedOutline': {
            //   borderColor: 'secondary.main'
            // },
            // '& .MuiOutlinedInput-root': {
            //   '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
            //   '&:hover fieldset': { borderColor: 'secondary.main' }
            // },
            // '& label.Mui-focused': { color: 'secondary.main' }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'secondary.main' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CancelIcon
                  fontSize="small"
                  sx={{
                    color: searchValue ? 'secondary.main' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
        />
        <ModeToggle />
        <Tooltip title="Notifications">
          <Badge
            color="error"
            variant="dot"
            invisible={invisible}
            sx={{ cursor: 'pointer' }}
          >
            <NotificationsNoneIcon sx={{ color: 'secondary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon
            sx={{ cursor: 'pointer', color: 'secondary.main' }}
          />
        </Tooltip>
        <AccountMenu />
      </Box>
    </Box>
  )
}

export default Header