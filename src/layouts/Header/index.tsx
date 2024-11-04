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
import { Button } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountMenu from '@/layouts/Header/Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

import OptionMenu from '@/layouts/Header/Menus'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'
import Notifications from '@/layouts/Header/Notifications/Notifications'
import AutoCompleteSearchBoard from '@/layouts/Header/SearchBoards/AutoCompleteSearchBoard'

const Header = () => {
  const activeBoard = useAppSelector((state) => state.boards.activeBoard)

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
        bgcolor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.trelloCustom.bgColor_Header_Light
            : theme.trelloCustom.bgColor_Header_Dark
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Link to={'/boards'} style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Boards List">
            <AppsIcon sx={{ color: 'customText.primary' }} />
          </Tooltip>
        </Link>
        <Link to={`/boards/${activeBoard?._id ? activeBoard._id : ''}`}>
          <Tooltip title="The board was just accessed">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SvgIcon
                component={TrelloIcon}
                inheritViewBox
                fontSize="small"
                sx={{ color: 'customText.primary' }}
              />
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  color: 'customText.primary'
                }}
              >
                Trello
              </Typography>
            </Box>
          </Tooltip>
        </Link>
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
        <AutoCompleteSearchBoard />
        <ModeToggle />

        <Notifications />

        <Tooltip title="Help">
          <HelpOutlineIcon
            sx={{ cursor: 'pointer', color: 'customText.primary' }}
          />
        </Tooltip>
        <AccountMenu />
      </Box>
    </Box>
  )
}

export default Header
