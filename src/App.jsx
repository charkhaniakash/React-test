import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { loadTodos, saveTodos, generateId } from './utils/storage'
import debounce from './utils/debounce' // New import for debouncing
import { LogoIcon, PlusIcon } from './components/Icons'
import TodoItem from './components/TodoItem'
import EmptyState from './components/EmptyState'
import FilterBar from './components/FilterBar'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [newTodoText, setNewTodoText] = useState('')
  const [filter, setFilter] = useState('all')
  const inputRef = useRef(null)

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  // Core logic for creating a todo, memoized with useCallback to be stable
  const createTodo = useCallback((text) => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const newTodo = { id: generateId(), text: trimmedText, completed: false, createdAt: new Date().toISOString() }
    setTodos((prev) => [...prev, newTodo])
    setNewTodoText('') // Clear input after adding
    inputRef.current?.focus()
  }, [setTodos, setNewTodoText]) // Dependencies for createTodo

  // Use useRef to store the debounced version of createTodo, initialized once
  const debouncedCreateTodo = useRef(null);

  useEffect(() => {
    debouncedCreateTodo.current = debounce(createTodo, 300);
  }, [createTodo]);

  const handleSubmit = (e) => {
    e.preventDefault()
    // Call the debounced function with the current value of newTodoText
    // This ensures 'createTodo' is called only after 300ms of inactivity.
    debouncedCreateTodo.current(newTodoText)
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
        // setArchivedTodos((archivedPrev) => [...archivedPrev, { ...todoToArchive, deletedAt: new Date().toISOString() }]) // Removed
      }
      return prev.filter((t) => t.id !== id)
    })
  }

  const restoreTodo = (id) => {
    // setArchivedTodos((archivedPrev) => { // Removed
    //   const todoToRestore = archivedPrev.find((t) => t.id === id) // Removed
    //   if (todoToRestore) { // Removed
    //     // Remove deletedAt property when restoring // Removed
    //     const { deletedAt, ...restoredTodo } = todoToRestore // Removed
    //     setTodos((todosPrev) => [...todosPrev, restoredTodo]) // Removed
    //   } // Removed
    //   return archivedPrev.filter((t) => t.id !== id) // Removed
    // }) // Removed
  }

  const permanentlyDeleteTodo = (id) => {
    // setArchivedTodos((archivedPrev) => archivedPrev.filter((t) => t.id !== id)) // Removed
  }

  const clearCompleted = () => {
    setTodos((prev) => {
      const completedTodos = prev.filter((t) => t.completed)
      if (completedTodos.length > 0) {
        const completedAndArchived = completedTodos.map((todo) => ({ ...todo, deletedAt: new Date().toISOString() }))
        // setArchivedTodos((archivedPrev) => [...archivedPrev, ...completedAndArchived]) // Removed
      }
      return prev.filter((t) => !t.completed)
    })
  }

  const isArchivedView = filter === 'archive'

  const filtered = isArchivedView
    ? [] // Changed to empty array as archivedTodos is removed
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
    day: 'numeric'
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
          <button type="submit" className="add-btn" id="add-btn" aria-label="Add task" disabled={!newTodoText.trim()}>
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