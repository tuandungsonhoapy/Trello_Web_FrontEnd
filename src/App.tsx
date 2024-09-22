import Button from '@mui/material/Button'
import ModeToggle from './components/ModeToggle/ModeToggle'

function App() {
  return (
    <>
      <ModeToggle />
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
