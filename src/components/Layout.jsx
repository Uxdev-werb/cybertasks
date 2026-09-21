import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Layout({ user }) {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

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
          <p className="text-xs text-gray-500 truncate mb-2">{user.email}</p>
          <button onClick={logout}
            className="text-red-400 text-sm hover:underline">Cerrar sesión</button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8 max-w-4xl">
        <Outlet />
      </main>
    </div>
  )
}
