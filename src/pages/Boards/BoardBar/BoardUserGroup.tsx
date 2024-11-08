import { useState } from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import { userInterface } from '@/interface/user-interface'
import UserMenu from '@/pages/Boards/BoardBar/UserMenu/UserMenu'

function BoardUserGroup({
  boardUsers = [],
  limit = 8
}: {
  boardUsers?: Array<userInterface>
  limit?: number
}) {
  /**
   * https://mui.com/material-ui/react-popover/
   */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTogglePopover = (event: any) => {
    if (!anchorPopoverElement && event)
      setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  return (
    <Box sx={{ display: 'flex', gap: '2px' }}>
      {/* Hiển thị giới hạn số lượng user theo số limit */}
      {boardUsers.map((user, index) => {
        if (index < limit) {
          return <UserMenu user={user} key={user._id} />
        }
      })}

      {/* Nếu số lượng users nhiều hơn limit thì hiện thêm +number */}
      {boardUsers.length > limit && (
        <Tooltip title="Show more">
          <Box
            aria-describedby={popoverId}
            onClick={handleTogglePopover}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '50%',
              color: 'white',
              backgroundColor: '#a4b0be'
            }}
          >
            +{boardUsers.length - limit}
          </Box>
        </Tooltip>
      )}

      {/* Khi Click vào +number ở trên thì sẽ mở popover hiện toàn bộ users, sẽ không limit nữa */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: '235px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {boardUsers.map((user) => (
            <UserMenu user={user} key={user._id} />
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default BoardUserGroup
