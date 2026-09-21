import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) return setError(error.message)
      setError('✅ Cuenta creada. Revisa tu correo para confirmar.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('❌ ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-emerald-400 mb-2 text-center">
          🛡️ CyberTasks
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          {mode === 'login' ? 'Accede a tu gestor de tareas' : 'Crea tu cuenta'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="tu@correo.com" required
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-gray-200" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña (mín. 8 caracteres)" required minLength={8}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-gray-200" />
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-lg p-3 font-semibold">
            {mode === 'login' ? 'Iniciar sesión' : 'Registrarme'}
          </button>
          <button type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="w-full text-gray-500 text-sm hover:text-emerald-400">
            {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}
      </div>
    </div>
  )
}
