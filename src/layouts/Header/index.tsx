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
import { Badge, Button, TextField } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountMenu from '@/layouts/Header/Menus/Profiles'

const Header = () => {
  const [invisible] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) => theme.trelloCustom.headerHeight,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        px: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{ color: 'primary.main' }}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: 'primary.main'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Workspaces />
        <Recent />
        <Starred />
        <Templates />
        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TextField
          size="small"
          id="outlined-search"
          label="Search field"
          type="search"
        />
        <ModeToggle />
        <Tooltip title="Notifications">
          <Badge
            color="secondary"
            variant="dot"
            invisible={invisible}
            sx={{ cursor: 'pointer' }}
          >
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>
        <AccountMenu />
      </Box>
    </Box>
  )
}

export default Header
