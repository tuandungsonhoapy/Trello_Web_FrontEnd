// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '@/assets/trelloIcon.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterSchemaType } from '@/utils/validationSchemas'
import FieldErrorAlert from '@/components/Form/FieldErrorAlert'
import { registerUserAPI } from '@/apis/userAPI'
import { toast } from 'react-toastify'

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  })

  const navigate = useNavigate()

  const handleRegister = (data: RegisterSchemaType) => {
    const { email, password } = data

    toast
      .promise(registerUserAPI({ email, password }), {
        pending: 'Registering...'
      })
      .then((user) => {
        navigate(`/login?registeredEmail=${user.email}`)
      })
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <Box
            sx={{
              margin: '1em',
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <TrelloIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              color: (theme) => theme.palette.grey[500]
            }}
          >
            Author: tddev
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                sx={{
                  '& input': {
                    color: 'constrastMode.main'
                  }
                }}
                fullWidth
                label="Enter Email..."
                type="text"
                {...register('email')}
                error={errors.email ? true : false}
                variant="outlined"
              />
              <FieldErrorAlert errors={errors} fieldName="email" />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                sx={{
                  '& input': {
                    color: 'constrastMode.main'
                  }
                }}
                {...register('password')}
                error={errors.password ? true : false}
                variant="outlined"
              />
              <FieldErrorAlert errors={errors} fieldName="password" />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password Confirmation..."
                type="password"
                sx={{
                  '& input': {
                    color: 'constrastMode.main'
                  }
                }}
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
                variant="outlined"
              />
              <FieldErrorAlert errors={errors} fieldName="confirmPassword" />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="interceptor-loading"
              size="large"
              fullWidth
            >
              Register
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Already have an account?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography
                sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
              >
                Log in!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm
