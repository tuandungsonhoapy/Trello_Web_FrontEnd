// TrungQuanDev: https://youtube.com/@trungquandev
import { useLocation, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from '@/pages/Auth/LoginForm'
import RegisterForm from '@/pages/Auth/RegisterForm'
import { useAppSelector } from '@/hooks/reduxHooks'

function Auth() {
  const location = useLocation()
  // console.log(location)
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const currentUser = useAppSelector((state) => state.auth.currentUser)
  if (currentUser) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background:
          'url("https://res.cloudinary.com/dhb6hqgak/image/upload/v1730825278/trelloCardCover/lxvps9ctm6fnxjovo5n0.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
      }}
    >
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Box>
  )
}

export default Auth
