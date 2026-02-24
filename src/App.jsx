import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'
import Dashboard from './components/Dashboard'
import useTodos from './hooks/useTodos'

export default function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  } = useTodos()

  const [filters, setFilters] = useState({
    client: '',
    project: '',
    status: 'all',
    priority: 'all',
  })

  const [activeView, setActiveView] = useState('tasks')

  const clients = [...new Set(todos.map((t) => t.client).filter(Boolean))]
  const projects = [...new Set(todos.map((t) => t.project).filter(Boolean))]

  const filteredTodos = todos.filter((todo) => {
    if (filters.client && todo.client !== filters.client) return false
    if (filters.project && todo.project !== filters.project) return false
    if (filters.status === 'active' && todo.completed) return false
    if (filters.status === 'completed' && !todo.completed) return false
    if (filters.priority !== 'all' && todo.priority !== filters.priority) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-indigo-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h1 className="text-2xl font-bold tracking-tight">FreelanceFlow</h1>
          </div>
          <nav className="flex gap-2">
            <button
              onClick={() => setActiveView('tasks')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'tasks'
                  ? 'bg-white text-indigo-700'
                  : 'text-indigo-200 hover:bg-indigo-600'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-white text-indigo-700'
                  : 'text-indigo-200 hover:bg-indigo-600'
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeView === 'tasks' ? (
          <div className="space-y-6">
            <TodoForm onAdd={addTodo} clients={clients} projects={projects} />
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              clients={clients}
              projects={projects}
            />
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              clients={clients}
              projects={projects}
            />
          </div>
        ) : (
          <Dashboard todos={todos} />
        )}
      </main>
    </div>
  )
}