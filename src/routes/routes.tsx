import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import Board from '@/pages/Boards/_id'
import NotFound from '@/pages/404/NotFound'
import Auth from '@/pages/Auth/Auth'
import AccountVerification from '@/pages/Auth/AccountVerification'
import { userInterface } from '@/interface/user-interface'
import Settings from '@/pages/Settings/Settings'
import { useAppSelector } from '@/hooks/reduxHooks'
import Boards from '@/pages/Boards'
import Require2FA from '@/components/2fa/require-2fa'
import { toast } from 'react-toastify'
import AdminLayout from '@/admin/layouts'
import UserManagement from '@/admin/pages/UserManagement/UserManagement'
import DashBoard from '@/admin/pages/DashBoard/DashBoard'
import { userRoles } from '@/utils/constants'

const ProtectedRoute = ({ user }: { user: userInterface | null }) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  if (user.require_2fa && !user.is_2fa_verified) {
    return <Navigate to="/verify-2fa" replace={true} />
  }
  return <Outlet />
}

const ProtectedAdminRoute = ({ user }: { user: userInterface | null }) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  if (user.role !== userRoles.ADMIN) {
    toast.error('You do not have permission to access this url!')
    return <Navigate to="/" replace={true} />
  }

  return <Outlet />
}

const AppRoutes = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/boards'} replace={true} />} />

      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route
          path="/boards/:boardId"
          element={
            <Layout>
              <Board />
            </Layout>
          }
        />
        <Route path="/boards" element={<Boards />} />
        <Route
          path="/settings/account"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/settings/security"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
      </Route>

      <Route element={<ProtectedAdminRoute user={currentUser} />}>
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          }
        >
          <Route path="users" element={<UserManagement />} />
          <Route index={true} element={<DashBoard />} />
        </Route>
      </Route>

      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/verify-account" element={<AccountVerification />} />
      <Route path="/verify-2fa" element={<Require2FA />} />

      {/* 404 not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
