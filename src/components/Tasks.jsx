import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['ciberseguridad', 'sistemas', 'inteligencia', 'proyectos', 'otros']
const PRIORITIES = ['alta', 'media', 'baja']
const priorityColor = { alta: 'text-red-400', media: 'text-yellow-400', baja: 'text-gray-500' }

export default function Tasks({ user }) {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('otros')
  const [priority, setPriority] = useState('media')
  const [filter, setFilter] = useState('todas')

  const load = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    setTasks(data || [])
  }
  useEffect(() => { load() }, [])

  const add = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await supabase.from('tasks').insert({
      user_id: user.id, title, category, priority
    })
    setTitle('')
    load()
  }

  const toggle = async (task) => {
    await supabase.from('tasks')
      .update({ status: task.status === 'completada' ? 'pendiente' : 'completada' })
      .eq('id', task.id)
    load()
  }

  const remove = async (id) => {
    await supabase.from('tasks').delete().eq('id', id)
    load()
  }

  const visible = filter === 'todas' ? tasks : tasks.filter(t => t.status === filter)

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">📋 Mis Tareas</h2>

      {/* Formulario */}
      <form onSubmit={add} className="flex gap-2 mb-6 flex-wrap">
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
          className="flex-1 min-w-48 bg-[#161b22] border border-[#30363d] rounded-lg p-3" />
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-3">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value)}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-3">
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button className="bg-emerald-600 hover:bg-emerald-500 rounded-lg px-6 font-semibold">
          +
        </button>
      </form>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {['todas', 'pendiente', 'completada'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm ${filter === f
              ? 'bg-emerald-600' : 'bg-[#21262d] text-gray-400 hover:bg-[#30363d]'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {visible.length === 0 && (
          <p className="text-gray-500 text-sm">No hay tareas aquí todavía 🎉</p>
        )}
        {visible.map(task => (
          <div key={task.id}
            className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <input type="checkbox" checked={task.status === 'completada'}
              onChange={() => toggle(task)}
              className="w-5 h-5 accent-emerald-500" />
            <div className="flex-1">
              <p className={`font-medium ${task.status === 'completada'
                ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                {task.title}
              </p>
              <div className="flex gap-3 mt-1 text-xs">
                <span className="text-gray-500">📁 {task.category}</span>
                <span className={priorityColor[task.priority]}>
                  🔥 {task.priority}
                </span>
                {task.due_date && (
                  <span className="text-gray-500">📅 {task.due_date}</span>
                )}
              </div>
            </div>
            <button onClick={() => remove(task.id)}
              className="text-gray-500 hover:text-red-400 px-2">
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
