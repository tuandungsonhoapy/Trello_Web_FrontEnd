import { ToastContainer, Bounce } from 'react-toastify'
import { useColorScheme } from '@mui/material'
import Container from '@mui/material/Container'
import Layout from './layouts/Layout'
import Board from '@/pages/Boards/_id'

function App() {
  const { mode } = useColorScheme()

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <Layout>
          <Board />
        </Layout>
      </Container>
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
