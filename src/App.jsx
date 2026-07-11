import { useState, useEffect, useRef } from 'react'
import { loadTodos, saveTodos, generateId } from './utils/storage'
import { LogoIcon, PlusIcon } from './components/Icons'
import TodoItem from './components/TodoItem'
import EmptyState from './components/EmptyState'
import FilterBar from './components/FilterBar'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const inputRef = useRef(null)

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos((prev) => [{ id: generateId(), text, completed: false }, ...prev])
    setInput('')
    inputRef.current?.focus()
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  const filtered = todos.filter((t) => {
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
            <h1>Todo</h1>
          </div>
          <span className="date">{today}</span>
        </header>

        <form className="input-wrapper" onSubmit={addTodo}>
          <input
            ref={inputRef}
            id="todo-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            autoComplete="off"
          />
          <button type="submit" className="add-btn" id="add-btn" aria-label="Add task">
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
