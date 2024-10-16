import Container from '@mui/material/Container'
import Layout from './layouts/Layout'
import Board from '@/pages/Boards/_id'

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
