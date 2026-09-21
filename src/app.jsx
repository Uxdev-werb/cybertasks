import { Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Layout from './components/Layout'
import Tasks from './components/Tasks'
import Settings from './components/Settings'

// 👇 TU USUARIO FIJO — pega aquí el ID de tu usuario de Supabase
const USER_ID = "4e537ead-e612-41ed-af4d-67b66a1a2618"
const USER = { id: USER_ID, email: "u4255598169@gmail.com" }

export default function App() {
  return (
    <Routes>
      <Route element={<Layout user={USER} />}>
        <Route path="/" element={<Tasks user={USER} />} />
        <Route path="/tareas" element={<Tasks user={USER} />} />
        <Route path="/configuracion" element={<Settings user={USER} />} />
      </Route>
    </Routes>
  )
}
