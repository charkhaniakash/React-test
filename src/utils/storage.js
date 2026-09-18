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

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMilliseconds = now.getTime() - date.getTime();

  if (diffMilliseconds < 60 * 1000) { // Less than 60 seconds
    return 'just now';
  }

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const seconds = Math.floor(diffMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return rtf.format(-minutes, 'minute');
  } else if (hours < 24) {
    return rtf.format(-hours, 'hour');
  } else if (days < 30) {
    return rtf.format(-days, 'day');
  } else {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
