{/*DashboardLayout.jsx*/}

import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { label: 'Overview', path: '/dashboard', end: true },
  { label: 'Enquiries', path: '/dashboard/enquiries' },
  { label: 'Quotations', path: '/dashboard/quotations' },
  { label: 'Careers', path: '/dashboard/careers' },
  { label: 'Blog', path: '/dashboard/blog' },
  { label: 'Newsletter', path: '/dashboard/newsletter' },
  { label: 'Users', path: '/dashboard/users', adminOnly: true },
]

export default function DashboardLayout({ title, children }) {
  const { user, logout } = useAuth()

  const items = NAV_ITEMS.filter((item) => !item.adminOnly || user?.role === 'admin')

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="flex flex-col md:flex-row max-w-[1400px] mx-auto">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-[rgba(0,212,255,0.1)] px-4 py-6">
          <div className="mb-6 px-2">
            <p className="text-xs text-[var(--muted)]">Signed in as</p>
            <p className="text-sm text-white truncate">{user?.username}</p>
            <p className="text-[10px] uppercase tracking-widest text-cyan mt-1">{user?.role}</p>
          </div>

          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `whitespace-nowrap px-3 py-2 text-sm rounded-sm transition-colors ${
                    isActive
                      ? 'bg-cyan/10 text-cyan border border-cyan/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={logout}
            className="mt-6 w-full text-left px-3 py-2 text-sm text-white/50 hover:text-red-300 transition-colors"
          >
            Sign Out
          </button>
        </aside>

        {/* Content */}
        <div className="flex-1 px-6 py-8 min-w-0">
          {title && (
            <h1 className="font-display text-2xl font-bold text-white mb-6">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </main>
  )
}
