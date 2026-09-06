import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingState label="Checking your session" />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
