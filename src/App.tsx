import Button from '@mui/material/Button'
import ModeSwitcher from './ModeSwitcher'

function App() {
  return (
    <>
      <div>TuanDungDev</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <ModeSwitcher />
    </>
  )
}

export default App
