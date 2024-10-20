import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { store } from '@/redux/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </CssVarsProvider>
  </>
)
