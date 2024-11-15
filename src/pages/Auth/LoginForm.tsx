// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useSearchParams } from 'react-router-dom'
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
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchemaType } from '@/utils/validationSchemas'
import FieldErrorAlert from '@/components/Form/FieldErrorAlert'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { loginUserAPI } from '@/redux/authSlice'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  })

  const [searchParams] = useSearchParams()
  const verifiedEmail = searchParams.get('verifiedEmail')
  const registeredEmail = searchParams.get('registeredEmail')

  const handleLogin = (data: LoginSchemaType) => {
    dispatch(loginUserAPI(data))
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '3em' }}>
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
              flexDirection: 'column',
              padding: '0 1em'
            }}
          >
            {verifiedEmail && (
              <Alert
                severity="success"
                sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
              >
                Your email&nbsp;
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
                >
                  {verifiedEmail}
                </Typography>
                &nbsp;has been verified.
                <br />
                Now you can login to enjoy our services!
              </Alert>
            )}
            {registeredEmail && (
              <Alert
                severity="info"
                sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
              >
                An email has been sent to&nbsp;
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
                >
                  {registeredEmail}
                </Typography>
                <br />
                Please check and verify your account before logging in!
              </Alert>
            )}
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                sx={{ '& input': { color: 'constrastMode.main' } }}
                error={errors.email ? true : false}
                {...register('email')}
                label="Enter Email..."
                type="text"
                variant="outlined"
              />
              <FieldErrorAlert errors={errors} fieldName="email" />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                sx={{ '& input': { color: 'constrastMode.main' } }}
                label="Enter Password..."
                error={errors.password ? true : false}
                {...register('password')}
                type="password"
                variant="outlined"
              />
              <FieldErrorAlert errors={errors} fieldName="password" />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              className="interceptor-loading"
            >
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography></Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography
                sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
              >
                Create account!
              </Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
