import { ToastContainer, Bounce } from 'react-toastify'
import { useColorScheme } from '@mui/material'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Layout from './layouts/Layout'
import Board from '@/pages/Boards/_id'
import NotFound from '@/pages/404/NotFound'
import Auth from '@/pages/Auth/Auth'
import AccountVerification from '@/pages/Auth/AccountVerification'
import { userInterface } from '@/interface/user-interface'
import { useAppSelector } from '@/hooks/reduxHooks'

const ProtectedRoute = ({ user }: { user: userInterface | null }) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />
  }
  return <Outlet />
}

function App() {
  const { mode } = useColorScheme()
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={'/boards/67132df2f05aebf2893b58ba'} replace={true} />
          }
        />

        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route
            path="/boards/:boardId"
            element={
              <Layout>
                <Board />
              </Layout>
            }
          />
        </Route>

        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/account/verification" element={<AccountVerification />} />

        {/* 404 not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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
