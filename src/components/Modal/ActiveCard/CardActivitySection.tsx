import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { useAppSelector } from '@/hooks/reduxHooks'
import { commnetInterface } from '@/interface/comment-interface'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Pagination from '@mui/material/Pagination'
import { useRef, useState } from 'react'

function CardActivitySection({
  cardComments = [],
  onAddCardComment
}: {
  cardComments: Array<commnetInterface>
  // eslint-disable-next-line no-unused-vars
  onAddCardComment: (comment: commnetInterface) => Promise<void>
}) {
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const [page, setPage] = useState<number>(1)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const limit = useRef<number>(10)

  const handleAddCardComment = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Bắt hành động người dùng nhấn phím Enter && không phải hành động Shift + Enter
    if (event.key === 'Enter' && !event.shiftKey && !isSubmitting) {
      event.preventDefault() // Thêm dòng này để khi Enter không bị nhảy dòng
      setIsSubmitting(true)

      const target = event.target as HTMLInputElement
      if (!target.value) return // Nếu không có giá trị gì thì return không làm gì cả

      // Tạo một biến commend data để gửi api
      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: (event.target as HTMLInputElement).value.trim()
      }
      onAddCardComment(commentToAdd as commnetInterface)
        .then(() => {
          target.value = '' // Sau khi thêm comment thì xóa giá trị trong ô input
        })
        .finally(() => setIsSubmitting(false))
    }
  }

  const currentComments = cardComments?.slice(
    (page - 1) * limit.current,
    page * limit.current
  )

  return (
    <Box sx={{ mt: 2 }}>
      {/* Xử lý thêm comment vào Card */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Avatar
          sx={{ width: 36, height: 36, cursor: 'pointer' }}
          alt="trungquandev"
          src={currentUser?.avatar || ''}
        />
        <TextField
          fullWidth
          placeholder="Write a comment..."
          type="text"
          variant="outlined"
          multiline
          onKeyDown={handleAddCardComment}
          disabled={isSubmitting}
        />
      </Box>

      {/* Hiển thị danh sách các comments */}
      {cardComments.length === 0 && (
        <Typography
          sx={{
            pl: '45px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#b1b1b1'
          }}
        >
          No activity found!
        </Typography>
      )}
      {currentComments?.map((comment, index: number) => (
        <Box
          sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }}
          key={index}
        >
          <Tooltip title={comment?.userDisplayName}>
            <Avatar
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              alt="trungquandev"
              src={comment?.userAvatar}
            />
          </Tooltip>
          <Box sx={{ width: 'inherit' }}>
            <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
              {comment?.userDisplayName}
            </Typography>

            <Typography component="span" sx={{ fontSize: '12px' }}>
              {moment(comment?.commentedAt).format('llll')}
            </Typography>

            <Box
              sx={{
                display: 'block',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#33485D' : 'white',
                p: '8px 12px',
                mt: '4px',
                border: '0.5px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                wordBreak: 'break-word',
                boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
              }}
            >
              {comment?.content}
            </Box>
          </Box>
        </Box>
      ))}

      {cardComments !== null && cardComments.length > 0 && (
        <Stack
          sx={{
            paddingTop: '10px'
          }}
          spacing={2}
        >
          <Pagination
            showFirstButton
            showLastButton
            onChange={(_event, value) => setPage(value)}
            page={page}
            count={Math.ceil(cardComments.length / limit.current)}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </Box>
  )
}

export default CardActivitySection
