{/*DashboardUsersPage.jsx*/}

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useApi } from '../../hooks'
import { getUsers, updateUser } from '../../lib/api/accounts'

const ROLE_OPTIONS = ['customer', 'employee', 'admin']

export default function DashboardUsersPage() {
  const { data, loading, error, run: fetchUsers } = useApi(getUsers)
  const { run: updateRole } = useApi(updateUser)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const users = data?.results || data || []

  const handleRoleChange = async (id, role) => {
    setUpdatingId(id)
    try {
      await updateRole(id, { role })
      fetchUsers()
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <>
      <Helmet>
        <title>Users — Dashboard</title>
      </Helmet>

      <DashboardLayout title="User Management">
        {loading && <p className="text-sm text-[var(--muted)]">Loading…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="border border-[rgba(0,212,255,0.15)] bg-[rgba(0,0,0,0.45)] p-4 rounded-sm flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="text-white font-medium">{u.username}</p>
                <p className="text-xs text-[var(--muted)]">{u.email}</p>
              </div>
              <select
                value={u.role}
                disabled={updatingId === u.id}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                className="bg-black/60 border border-cyan/20 text-white text-xs px-2 py-1 focus:outline-none focus:border-cyan"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </DashboardLayout>
    </>
  )
}
