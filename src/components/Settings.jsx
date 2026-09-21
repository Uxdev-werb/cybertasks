import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Settings({ user }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()
      .then(({ data }) => data && setUsername(data.username || ''))
  }, [user.id])

  const saveProfile = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('profiles')
      .update({ username })
      .eq('id', user.id)
    setMessage(error ? '❌ ' + error.message : '✅ Perfil guardado')
  }

  const changePassword = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password })
    setMessage(error ? '❌ ' + error.message : '✅ Contraseña actualizada')
    setPassword('')
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">⚙️ Configuración</h2>

      {message && (
        <p className="mb-4 text-sm text-emerald-400 bg-emerald-600/10 border border-emerald-600/30 rounded-lg p-3">
          {message}
        </p>
      )}

      {/* Perfil */}
      <form onSubmit={saveProfile}
        className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 mb-6">
        <h3 className="font-semibold mb-4">👤 Perfil</h3>
        <p className="text-sm text-gray-500 mb-4">{user.email}</p>
        <input value={username} onChange={e => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 mb-4" />
        <button className="bg-emerald-600 hover:bg-emerald-500 rounded-lg px-6 py-2 font-semibold">
          Guardar
        </button>
      </form>

      {/* Contraseña */}
      <form onSubmit={changePassword}
        className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
        <h3 className="font-semibold mb-4">🔒 Cambiar contraseña</h3>
        <input type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Nueva contraseña (mín. 8)" required minLength={8}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 mb-4" />
        <button className="bg-emerald-600 hover:bg-emerald-500 rounded-lg px-6 py-2 font-semibold">
          Actualizar
        </button>
      </form>
    </div>
  )
}
