import { Navigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/components/Loading/LoadingSpinner'
import { verifyUserAPI } from '@/apis/userAPI'

const AccountVerification = () => {
  const [searchParams] = useSearchParams()
  const [isVerified, setIsVerified] = useState(false)

  const { email, token } = Object.fromEntries([...searchParams])

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setIsVerified(true))
        .catch(() => setIsVerified(false))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" />
  }

  // * Call API to verify account

  if (!isVerified) {
    return <LoadingSpinner caption="Verifying account..." />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
