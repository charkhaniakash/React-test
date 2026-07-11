const STORAGE_KEY = 'todo-app-items'

export function loadTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
