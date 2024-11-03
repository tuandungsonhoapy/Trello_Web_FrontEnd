import { useEffect, useState } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import {
  addNotification,
  fetchInvitationsAPI,
  updateBoardInvitationAPI
} from '@/redux/notificationsSlice'
import { socketIoInstance } from '@/socket'
import { invitationInterface } from '@/interface/invitation-interface'
import { useNavigate } from 'react-router-dom'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickNotificationIcon = (event: any) => {
    setAnchorEl(event.currentTarget)

    setOpenNotification(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()

  const [openNotification, setOpenNotification] = useState(false)

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  )
  const user = useAppSelector((state) => state.auth.currentUser)
  const dispatch = useAppDispatch()

  const updateBoardInvitation = (status: string, invitationId: string) => {
    dispatch(updateBoardInvitationAPI({ status, invitationId })).then((res) => {
      if (
        res.payload.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED
      ) {
        navigate(`/boards/${res.payload.boardInvitation.boardId}`)
      }
    })
  }

  useEffect(() => {
    dispatch(fetchInvitationsAPI())

    // Create function to handle when receive a event real-time
    const handleReceiveInvitation = (invitation: invitationInterface) => {
      if (invitation.inviteeId === user?._id) {
        // Add new notification to redux store
        dispatch(addNotification(invitation))

        // Show notification
        setOpenNotification(true)
      }
    }

    socketIoInstance.on('be-invite-user-to-board', handleReceiveInvitation)

    return () => {
      socketIoInstance.off('be-invite-user-to-board', handleReceiveInvitation)
    }
  }, [dispatch, user?._id])

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          variant={openNotification ? 'dot' : 'standard'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon
            sx={{
              color: openNotification ? 'green' : 'customText.primary'
            }}
          />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {(!notifications || notifications.length === 0) && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {notifications?.map((notification, index) => (
          <Box key={notification._id}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: 'auto'
              }}
            >
              <Box
                sx={{
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                {/* Nội dung của thông báo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box>
                    <GroupAddIcon fontSize="small" />
                  </Box>
                  <Box>
                    <strong>{notification.inviter?.displayName}</strong> had
                    invited you to join the board{' '}
                    <strong>{notification.board?.title}</strong>
                  </Box>
                </Box>

                {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                {notification.boardInvitation?.status ===
                BOARD_INVITATION_STATUS.PENDING ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Button
                        className="interceptor-loading"
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ color: 'white' }}
                        size="small"
                        onClick={() =>
                          updateBoardInvitation(
                            BOARD_INVITATION_STATUS.ACCEPTED,
                            notification._id
                          )
                        }
                      >
                      Accept
                      </Button>
                      <Button
                        className="interceptor-loading"
                        type="submit"
                        variant="contained"
                        color="error"
                        sx={{ color: 'white' }}
                        size="small"
                        onClick={() =>
                          updateBoardInvitation(
                            BOARD_INVITATION_STATUS.REJECTED,
                            notification._id
                          )
                        }
                      >
                      Reject
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        justifyContent: 'flex-end'
                      }}
                    >
                      {notification.boardInvitation?.status ===
                      BOARD_INVITATION_STATUS.ACCEPTED && (
                        <Chip
                          icon={<DoneIcon />}
                          label="Accepted"
                          color="success"
                          size="small"
                        />
                      )}
                      {notification.boardInvitation?.status ===
                      BOARD_INVITATION_STATUS.REJECTED && (
                        <Chip
                          icon={<NotInterestedIcon />}
                          label="Rejected"
                          size="small"
                        />
                      )}
                    </Box>
                  )}

                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: 'right' }}>
                  <Typography component="span" sx={{ fontSize: '13px' }}>
                    {moment(notification.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== notifications?.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}

export default Notifications
