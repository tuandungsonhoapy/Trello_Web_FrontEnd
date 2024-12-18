import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import { styled } from '@mui/material'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import AutoModeIcon from '@mui/icons-material/AutoMode'
import FilterListIcon from '@mui/icons-material/FilterList'
import { boardInterface } from '@/interface/board-interface'
import { capitalizeFirstLetter } from '@/utils/formatter'
import BoardUserGroup from '@/pages/Boards/BoardBar/BoardUserGroup'
import InviteBoardUser from '@/pages/Boards/BoardBar/InviteBoardUser'

const StyledChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.customText.primary,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  px: '4px',
  fontWeight: theme.trelloCustom.semiBold,
  '& .MuiSvgIcon-root': {
    color: theme.palette.customText.primary
  },
  '&:hover': {
    backgroundColor: 'primary.100'
  }
}))

const BoardBar = ({ board }: { board: boardInterface | null }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) => theme.trelloCustom.boardBarHeight,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        px: 2,
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => theme.palette.customBg.main
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <StyledChip icon={<DashboardIcon />} label={board?.title} clickable />
        <StyledChip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type || '')}
          clickable
        />
        <StyledChip
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <StyledChip icon={<AutoModeIcon />} label="Automation" clickable />
        <StyledChip icon={<FilterListIcon />} label="Filters" clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <InviteBoardUser boardId={board?._id} />
        <BoardUserGroup boardUsers={board?.FE_allUsers || []} />
      </Box>
    </Box>
  )
}

export default BoardBar
