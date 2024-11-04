import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CancelIcon from '@mui/icons-material/Cancel'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'

import ToggleFocusInput from '@/components/Form/ToggleFocusInput'
import VisuallyHiddenInput from '@/components/Form/VisuallyHiddenInput'
import { singleFileValidator } from '@/utils/validationFile'
import { toast } from 'react-toastify'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardActivitySection from './CardActivitySection'

import { styled } from '@mui/material/styles'
import { clearActiveCard, setActiveCard } from '@/redux/activeCardSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { updateCardAPI } from '@/apis/cardAPI'
import { cardInterface } from '@/interface/board-interface'
import { updateCard } from '@/redux/boardsSlice'
import { commnetInterface } from '@/interface/comment-interface'
import { CARD_MEMBER_ACTIONS } from '@/utils/constants'
import { socketIoInstance } from '@/socket'
import { useEffect } from 'react'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))

/**
 * Note: Modal là một low-component mà bọn MUI sử dụng bên trong những thứ như Dialog, Drawer, Menu, Popover. Ở đây dĩ nhiên chúng ta có thể sử dụng Dialog cũng không thành vấn đề gì, nhưng sẽ sử dụng Modal để dễ linh hoạt tùy biến giao diện từ con số 0 cho phù hợp với mọi nhu cầu nhé.
 */
export interface incomingMemberInterface {
  incomingMember: { userId: string; action: string }
}

function ActiveCard() {
  const { activeCard, isShowActiveCard } = useAppSelector(
    (state) => state.activeCard
  )

  const user = useAppSelector((state) => state.auth.currentUser)

  const dispatch = useAppDispatch()

  const callApiUpdateCard = async (
    data: cardInterface | FormData | incomingMemberInterface
  ) => {
    if (!activeCard?._id) return

    const cardResponse = await updateCardAPI(activeCard?._id, data)

    // Cập nhật activeCard trong Redux
    dispatch(setActiveCard(cardResponse as cardInterface))

    // Cập nhật lại card trong activeBoard của Redux
    dispatch(updateCard(cardResponse as cardInterface))

    socketIoInstance.emit('fe-update-card', cardResponse)

    return cardResponse
  }

  const handleCloseModal = () => {
    dispatch(clearActiveCard())
  }

  const onUpdateCardTitle = (newTitle: string) => {
    callApiUpdateCard({ title: newTitle.trim() } as cardInterface)
  }

  const onUploadCardCover = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      toast.error('No file selected')
      return
    }

    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    const formData = new FormData()
    formData.append('cardCover', event.target?.files[0])

    toast
      .promise(callApiUpdateCard(formData), {
        pending: 'Uploading card cover...',
        success: 'Upload successfully!',
        error: 'Update failed!'
      })
      .then(() => {
        event.target.value = ''
      })
      .catch(() => (event.target.value = ''))
  }

  const onUpdateCardDescription = (newDescription: string) => {
    callApiUpdateCard({ description: newDescription } as cardInterface)
  }

  const onAddCardComment = async (comment: commnetInterface) => {
    await callApiUpdateCard({ comments: [comment] } as cardInterface)
  }

  const onUpdateCardMember = (data: { userId: string; action: string }) => {
    callApiUpdateCard({ incomingMember: data } as incomingMemberInterface)
  }

  useEffect(() => {
    const handleReceiveUpdateCard = (card: cardInterface) => {
      dispatch(setActiveCard(card))
    }

    socketIoInstance.on('be-update-card', handleReceiveUpdateCard)

    return () => {
      socketIoInstance.off('be-update-card', handleReceiveUpdateCard)
    }
  }, [dispatch])

  return (
    <Modal
      disableScrollLock
      open={isShowActiveCard}
      onClose={handleCloseModal} // Sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
      sx={{ overflowY: 'auto' }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 900,
          maxWidth: 900,
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          outline: 0,
          padding: '40px 20px 20px',
          margin: '50px auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            right: '10px',
            cursor: 'pointer'
          }}
        >
          <CancelIcon
            color="error"
            sx={{ '&:hover': { color: 'error.light' } }}
            onClick={handleCloseModal}
          />
        </Box>

        {activeCard?.cover && (
          <Box sx={{ mb: 4 }}>
            <img
              style={{
                width: '100%',
                height: '320px',
                borderRadius: '6px',
                objectFit: 'cover'
              }}
              src={activeCard?.cover}
              alt="card-cover"
            />
          </Box>
        )}

        <Box
          sx={{
            mb: 1,
            mt: -3,
            pr: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <CreditCardIcon />

          {/* Feature 01: Xử lý tiêu đề của Card */}
          <ToggleFocusInput
            inputFontSize="22px"
            value={activeCard?.title || ''}
            onChangedValue={onUpdateCardTitle}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Left side */}
          <Grid xs={12} sm={9}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
              >
                Members
              </Typography>

              {/* Feature 02: Xử lý các thành viên của Card */}
              <CardUserGroup
                cardMemberIds={activeCard?.memberIds || []}
                onUpdateCardMember={onUpdateCardMember}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography
                  component="span"
                  sx={{ fontWeight: '600', fontSize: '20px' }}
                >
                  Description
                </Typography>
              </Box>

              {/* Feature 03: Xử lý mô tả của Card */}
              <CardDescriptionMdEditor
                cardDescriptionProp={activeCard?.description || ''}
                onUpdateCardDescription={onUpdateCardDescription}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography
                  component="span"
                  sx={{ fontWeight: '600', fontSize: '20px' }}
                >
                  Activity
                </Typography>
              </Box>

              {/* Feature 04: Xử lý các hành động, ví dụ comment vào Card */}
              <CardActivitySection
                cardComments={activeCard?.comments || []}
                onAddCardComment={onAddCardComment}
              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid xs={12} sm={3}>
            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Add To Card
            </Typography>
            <Stack direction="column" spacing={1}>
              {/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
              {!activeCard?.memberIds?.includes(user?._id || '') && (
                <SidebarItem
                  onClick={() =>
                    onUpdateCardMember({
                      userId: user?._id || '',
                      action: CARD_MEMBER_ACTIONS.ADD
                    })
                  }
                  className="active"
                >
                  <PersonOutlineOutlinedIcon fontSize="small" />
                  Join
                </SidebarItem>
              )}

              {/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
              <SidebarItem className="active" component="label">
                <ImageOutlinedIcon fontSize="small" />
                Cover
                <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
              </SidebarItem>

              <SidebarItem>
                <AttachFileOutlinedIcon fontSize="small" />
                Attachment
              </SidebarItem>
              <SidebarItem>
                <LocalOfferOutlinedIcon fontSize="small" />
                Labels
              </SidebarItem>
              <SidebarItem>
                <TaskAltOutlinedIcon fontSize="small" />
                Checklist
              </SidebarItem>
              <SidebarItem>
                <WatchLaterOutlinedIcon fontSize="small" />
                Dates
              </SidebarItem>
              <SidebarItem>
                <AutoFixHighOutlinedIcon fontSize="small" />
                Custom Fields
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Power-Ups
            </Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem>
                <AspectRatioOutlinedIcon fontSize="small" />
                Card Size
              </SidebarItem>
              <SidebarItem>
                <AddToDriveOutlinedIcon fontSize="small" />
                Google Drive
              </SidebarItem>
              <SidebarItem>
                <AddOutlinedIcon fontSize="small" />
                Add Power-Ups
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
            >
              Actions
            </Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem>
                <ArrowForwardOutlinedIcon fontSize="small" />
                Move
              </SidebarItem>
              <SidebarItem>
                <ContentCopyOutlinedIcon fontSize="small" />
                Copy
              </SidebarItem>
              <SidebarItem>
                <AutoAwesomeOutlinedIcon fontSize="small" />
                Make Template
              </SidebarItem>
              <SidebarItem>
                <ArchiveOutlinedIcon fontSize="small" />
                Archive
              </SidebarItem>
              <SidebarItem>
                <ShareOutlinedIcon fontSize="small" />
                Share
              </SidebarItem>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
