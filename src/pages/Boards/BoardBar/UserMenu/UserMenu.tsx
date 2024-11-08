import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { userInterface } from '@/interface/user-interface'
import MessageIcon from '@mui/icons-material/Message'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { removeUserFromBoardAPI } from '@/apis/boardAPI'
import { updateMemberIds } from '@/redux/boardsSlice'
import { boardInterface } from '@/interface/board-interface'
import { toast } from 'react-toastify'
import { socketIoInstance } from '@/socket'

export default function UserMenu({ user }: { user: userInterface }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const board = useAppSelector((state) => state.boards.activeBoard)

  const dispatch = useAppDispatch()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRemoveUser = () => {
    removeUserFromBoardAPI({
      boardId: board?._id || '',
      userId: user._id
    }).then((board) => {
      dispatch(updateMemberIds(board as boardInterface))
      toast.success('User removed from board!')
      socketIoInstance.emit('fe-remove-user-from-board', board)
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={user?.displayName}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{ p: 0 }}
          >
            <Avatar
              sx={{ width: 34, height: 34, cursor: 'pointer' }}
              alt={user?.displayName}
              src={user?.avatar || ''}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider /> */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MessageIcon fontSize="small" />
          </ListItemIcon>
          Chat
        </MenuItem>
        <MenuItem onClick={handleRemoveUser}>
          <ListItemIcon>
            <PersonRemoveIcon fontSize="small" />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
