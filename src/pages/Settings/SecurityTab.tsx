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
import { useAppDispatch } from '@/hooks/reduxHooks'
import { logoutUserAPI, updateUserAPI } from '@/redux/authSlice'
import { toast } from 'react-toastify'

function SecurityTab() {
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
                color="primary"
                fullWidth
              >
                Change
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default SecurityTab
