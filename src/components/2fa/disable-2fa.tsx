import { useState, memo } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import SecurityIcon from '@mui/icons-material/Security'
import CancelIcon from '@mui/icons-material/Cancel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { disable2faAPI } from '@/apis/userAPI'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { updateCurrentUser } from '@/redux/authSlice'

// Tài liệu về Material Modal rất dễ ở đây: https://mui.com/material-ui/react-modal/
function Disable2FA({
  isOpen,
  toggleOpen
}: {
  isOpen: boolean
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [otpToken, setConfirmOtpToken] = useState('')
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const handleCloseModal = () => {
    toggleOpen(false)
    setConfirmOtpToken('')
    setError(null)
  }

  const handleConfirmDisable2FA = () => {
    if (!otpToken) {
      const errMsg = 'Please enter your otp token.'
      setError(errMsg)
      toast.error(errMsg)
      return
    }

    // Call API
    toast
      .promise(disable2faAPI({ otpToken }), {
        pending: 'Disabling 2FA...',
        success: '2FA disabled successfully',
        error: 'Failed to disable 2FA'
      })
      .then((user) => {
        dispatch(updateCurrentUser(user))
        handleCloseModal()
      })
  }

  return (
    <Modal
      disableScrollLock
      open={isOpen}
      onClose={handleCloseModal} // Sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
      sx={{ overflowY: 'auto' }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: 700,
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          outline: 0,
          padding: '40px 20px 20px',
          margin: '120px auto',
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

        <Box
          sx={{
            mb: 1,
            mt: -3,
            pr: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <SecurityIcon sx={{ color: '#C62828' }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#C62828' }}
          >
            Disable 2FA (Two-Factor Authentication)
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            p: 1
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            Quét mã QR trên ứng dụng <strong>Google Authenticator</strong> hoặc{' '}
            <strong>Authy</strong> của bạn.
            <br />
            Sau đó nhập mã gồm 6 chữ số và click vào <strong>Confirm</strong> để
            disable 2FA.
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              my: 1
            }}
          >
            <TextField
              autoFocus
              autoComplete="nope"
              label="Enter your code..."
              type="text"
              variant="outlined"
              sx={{ minWidth: '280px' }}
              value={otpToken}
              onChange={(e) => setConfirmOtpToken(e.target.value)}
              error={!!error && !otpToken}
            />

            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: 'none',
                minWidth: '120px',
                height: '55px',
                fontSize: '1em',
                bgcolor: 'constrastMode.main'
              }}
              onClick={handleConfirmDisable2FA}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default memo(Disable2FA)
