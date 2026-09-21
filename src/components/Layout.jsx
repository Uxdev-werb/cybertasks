import { NavLink, Outlet } from 'react-router-dom'

export default function Layout({ user }) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#161b22] border-r border-[#30363d] p-4 flex flex-col">
        <h1 className="text-emerald-400 font-bold text-lg mb-6">🛡️ CyberTasks</h1>
        <nav className="space-y-1 flex-1">
          {[
            ['/', '📋 Tareas'],
            ['/configuracion', '⚙️ Configuración'],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({isActive}) =>
                `block p-2 rounded-lg text-sm ${isActive
                  ? 'bg-emerald-600/20 text-emerald-400'
                  : 'text-gray-400 hover:bg-[#21262d]'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-[#30363d] pt-3">
          <p className="text-xs text-gray-500 truncate">👤 {user.email}</p>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8 max-w-4xl">
        <Outlet />
      </main>
    </div>
  )
}
