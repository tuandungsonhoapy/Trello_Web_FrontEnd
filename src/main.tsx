import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { store } from '@/redux/store.ts'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter } from 'react-router-dom'
import { injectStore } from '@/apis/apiConfig.ts'

// * Configuring the redux persist
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

// * Inject store to axios
injectStore(store)

// * Config react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <CssVarsProvider theme={theme}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </CssVarsProvider>
        </BrowserRouter>
      </PersistGate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
)
