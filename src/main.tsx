import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { store } from '@/redux/store.ts'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { ConfirmProvider } from 'material-ui-confirm'

createRoot(document.getElementById('root')!).render(
  <>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </Provider>
    </CssVarsProvider>
  </>
)
