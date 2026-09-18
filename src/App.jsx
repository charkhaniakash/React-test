import { useState, useEffect, useRef } from 'react'
import { loadTodos, saveTodos, generateId } from './utils/storage'
import { LogoIcon, PlusIcon } from './components/Icons'
import TodoItem from './components/TodoItem'
import EmptyState from './components/EmptyState'
import FilterBar from './components/FilterBar'

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [newTodoText, setNewTodoText] = useState('')
  const [filter, setFilter] = useState('all')
  const [archivedTodos, setArchivedTodos] = useState(() => loadTodos('archivedTodos'))
  const inputRef = useRef(null)

  useEffect(() => {
    saveTodos(todos)
    saveTodos('archivedTodos', archivedTodos)
  }, [todos, archivedTodos])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = newTodoText.trim()
    if (!text) return
    const newTodo = { id: generateId(), text: text, completed: false }
    setTodos((prev) => [...prev, newTodo])
    setNewTodoText('')
    inputRef.current?.focus()
  }

  const handleNewTodoTextChange = (e) => {
    setNewTodoText(e.target.value)
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => {
      const todoToArchive = prev.find((t) => t.id === id)
      if (todoToArchive) {
        setArchivedTodos((archivedPrev) => [...archivedPrev, todoToArchive])
      }
      return prev.filter((t) => t.id !== id)
    })
  }

  const restoreTodo = (id) => {
    setArchivedTodos((archivedPrev) => {
      const todoToRestore = archivedPrev.find((t) => t.id === id)
      if (todoToRestore) {
        setTodos((todosPrev) => [...todosPrev, todoToRestore])
      }
      return archivedPrev.filter((t) => t.id !== id)
    })
  }

  const permanentlyDeleteTodo = (id) => {
    setArchivedTodos((archivedPrev) => archivedPrev.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => {
      const completedTodos = prev.filter((t) => t.completed)
      setArchivedTodos((archivedPrev) => [...archivedPrev, ...completedTodos])
      return prev.filter((t) => !t.completed)
    })
  }

  const isArchivedView = filter === 'archive'

  const filtered = isArchivedView
    ? archivedTodos
    : todos.filter((t) => {
        if (filter === 'active') return !t.completed
        if (filter === 'completed') return t.completed
        return true
      })

  const remaining = todos.filter((t) => !t.completed).length
  const hasCompleted = todos.some((t) => t.completed)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="app">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">
              <LogoIcon />
            </div>
            <h1>My Tasks</h1>
          </div>
          <span className="date">{today}</span>
        </header>

        <form className="input-wrapper" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            id="todo-input"
            type="text"
            value={newTodoText}
            onChange={handleNewTodoTextChange}
            placeholder="Add a new task..."
            autoComplete="off"
          />
          <button 
            type="submit" 
            className="add-btn" 
            id="add-btn" 
            aria-label="Add task"
            disabled={newTodoText.trim().length === 0}
          >
            <PlusIcon />
          </button>
        </form>

        <FilterBar filter={filter} onFilterChange={setFilter} />

        {filtered.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <ul className="todo-list" aria-label="Task list">
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                isArchivedView={isArchivedView}
                onRestore={restoreTodo}
                onPermanentlyDelete={permanentlyDeleteTodo}
              />
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <footer className="footer">
            <span>
              {remaining} task{remaining !== 1 ? 's' : ''} remaining
            </span>
            {hasCompleted && (
              <button
                className="clear-btn"
                id="clear-completed-btn"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
    </>
  )
}