import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'

// This guard only controls what the browser *renders*. The real security
// boundary is Supabase Row Level Security on the admin-managed tables
// (see supabase/schema.sql) — the client-side check below is a UX
// convenience, never the source of truth for authorization.
export default function AdminRoute({ children }) {
  const { user, profile, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingState label="Verifying admin access" />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!profile || !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
