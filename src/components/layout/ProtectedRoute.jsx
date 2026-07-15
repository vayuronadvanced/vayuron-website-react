{/*ProtectedRoute.jsx*/}

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Wraps a route element, requiring authentication (and optionally specific
 * roles). Usage:
 *
 *   <Route path="/dashboard" element={
 *     <ProtectedRoute roles={['admin', 'employee']}>
 *       <DashboardPage />
 *     </ProtectedRoute>
 *   } />
 */
export default function ProtectedRoute({ children, roles = null }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-[var(--muted)] text-sm">Checking session…</p>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
