import { ToastContainer, Bounce } from 'react-toastify'
import { useColorScheme } from '@mui/material'
import AppRoutes from '@/routes/routes'

function App() {
  const { mode } = useColorScheme()

  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode === 'system' ? 'colored' : mode}
        transition={Bounce}
      />
    </>
  )
}

export default App
