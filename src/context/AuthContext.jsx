{/*AuthContext.jsx*/}

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import * as accountsApi from '../lib/api/accounts'
import { tokenStorage } from '../lib/apiClient'

const AuthContext = createContext(null)

/**
 * Access the current auth state: { user, loading, login, logout, register }.
 * `user` is null when logged out, otherwise { id, username, email, role, ... }.
 */
// eslint-disable-next-line react-refresh/only-export-components -- context+hook co-located by design, matches LenisContext pattern
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // Starts true so protected routes don't flash-redirect before the initial
  // getMe() check (using an existing token) has had a chance to resolve.
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hydrate = async () => {
      if (!tokenStorage.getAccess()) {
        setLoading(false)
        return
      }
      try {
        const me = await accountsApi.getMe()
        setUser(me)
      } catch {
        tokenStorage.clear()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    hydrate()
  }, [])

  const login = useCallback(async (credentials) => {
    await accountsApi.login(credentials)
    const me = await accountsApi.getMe()
    setUser(me)
    return me
  }, [])

  const logout = useCallback(() => {
    accountsApi.logout()
    setUser(null)
  }, [])

  const register = useCallback(async (payload) => {
    const newUser = await accountsApi.register(payload)
    return newUser
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
