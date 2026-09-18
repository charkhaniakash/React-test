const STORAGE_KEY = 'todo-app-items'

export function loadTodos(key = STORAGE_KEY) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveTodos(todos, key = STORAGE_KEY) {
  localStorage.setItem(key, JSON.stringify(todos))
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
