import Container from '@mui/material/Container'
import Layout from './layout/Layout'
import Board from './pages/Boards'

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Layout>
        <Board />
      </Layout>
    </Container>
  )
}

export default App
