import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Layout from './components/Layout'
import Tasks from './components/Tasks'
import Settings from './components/Settings'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-emerald-400">
      Cargando...
    </div>
  )

  if (!user) return <Auth />

  return (
    <Routes>
      <Route element={<Layout user={user} />}>
        <Route path="/" element={<Tasks user={user} />} />
        <Route path="/tareas" element={<Tasks user={user} />} />
        <Route path="/configuracion" element={<Settings user={user} />} />
      </Route>
    </Routes>
  )
}
