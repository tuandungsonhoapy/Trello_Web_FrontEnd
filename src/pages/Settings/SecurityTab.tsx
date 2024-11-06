import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import PasswordIcon from '@mui/icons-material/Password'
import LockResetIcon from '@mui/icons-material/LockReset'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import FieldErrorAlert from '@/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { useConfirm } from 'material-ui-confirm'
import { zodResolver } from '@hookform/resolvers/zod'
import { securitySchema, SecuritySchemaType } from '@/utils/validationSchemas'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { logoutUserAPI, updateUserAPI } from '@/redux/authSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Setup2FA from '@/components/2fa/setup-2fa'
import { Alert } from '@mui/material'
import Disable2fa from '@/components/2fa/disable-2fa'

function SecurityTab() {
  const [openSetup2FA, setOpenSetup2FA] = useState(false)
  const [openDisable2FA, setOpenDisable2FA] = useState(false)
  const user = useAppSelector((state) => state.auth.currentUser)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SecuritySchemaType>({
    resolver: zodResolver(securitySchema)
  })

  const confirmChangePassword = useConfirm()
  const submitChangePassword = (data: SecuritySchemaType) => {
    confirmChangePassword({
      title: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LogoutIcon sx={{ color: 'warning.dark' }} /> Change Password
        </Box>
      ),
      description:
        'You have to login again after successfully changing your password. Continue?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'error',
        style: {
          color: 'black'
        }
      },
      cancellationButtonProps: {
        variant: 'contained',
        color: 'primary',
        style: {
          color: 'black'
        }
      }
    })
      .then(() => {
        const { current_password, new_password } = data
        // * Call API to change password
        dispatch(updateUserAPI({ current_password, new_password }))
          .unwrap()
          .then(() => {
            // * Logout user after changing password
            dispatch(logoutUserAPI())
            toast.success('Password changed successfully. Please login again.')
          })
          .catch(() => {})
      })
      .catch(() => {})
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Setup2FA isOpen={openSetup2FA} toggleOpen={setOpenSetup2FA} />
      <Disable2fa isOpen={openDisable2FA} toggleOpen={setOpenDisable2FA} />
      <Box
        sx={{
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <Box>
          <Typography variant="h5">Security Dashboard</Typography>
        </Box>
        <form onSubmit={handleSubmit(submitChangePassword)}>
          <Box
            sx={{
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Box>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                sx={{ '& input': { color: 'constrastMode.main' } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                {...register('current_password')}
                error={!!errors['current_password']}
              />
              <FieldErrorAlert errors={errors} fieldName={'current_password'} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                sx={{ '& input': { color: 'constrastMode.main' } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                {...register('new_password')}
                error={!!errors['new_password']}
              />
              <FieldErrorAlert errors={errors} fieldName={'new_password'} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password Confirmation"
                type="password"
                sx={{ '& input': { color: 'constrastMode.main' } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockResetIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                {...register('new_password_confirmation', {
                  validate: (value) => {
                    if (value === watch('new_password')) return true
                    return 'Password confirmation does not match.'
                  }
                })}
                error={!!errors['new_password_confirmation']}
              />
              <FieldErrorAlert
                errors={errors}
                fieldName={'new_password_confirmation'}
              />
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                sx={{ bgcolor: 'constrastMode.main' }}
                fullWidth
              >
                Change
              </Button>
            </Box>

            <Alert
              severity={`${user?.require_2fa ? 'success' : 'warning'}`}
              sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
            >
              Tình trạng bảo mật tài khoản:&nbsp;
              <Typography
                component="span"
                sx={{
                  fontWeight: 'bold',
                  '&:hover': { color: '#e67e22', cursor: 'pointer' }
                }}
              >
                {user?.require_2fa ? 'Đã Bật' : 'Chưa Bật'} xác thực 2 lớp -
                Two-Factor Authentication (2FA)
              </Typography>
            </Alert>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: 2,
                mt: 1
              }}
            >
              {!user?.require_2fa && (
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  sx={{
                    maxWidth: 'max-content',
                    bgcolor: 'constrastMode.main'
                  }}
                  onClick={() => setOpenSetup2FA(true)}
                >
                  Enable 2FA
                </Button>
              )}
              {user?.require_2fa && (
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  sx={{
                    maxWidth: 'max-content',
                    bgcolor: 'constrastMode.main'
                  }}
                  onClick={() => setOpenDisable2FA(true)}
                >
                  Disable 2FA
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default SecurityTab
