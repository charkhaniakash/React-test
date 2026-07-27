import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: inputValue.trim(), completed: false }]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const activeTodos = todos.filter(t => !t.completed);
  const filteredTodos = todos.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Done') return t.completed;
    return true;
  });

  return (
    <div>
      <div>
        <h1>My Tasks</h1>
        <input
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button aria-label="Add task" onClick={addTask}>+</button>
      </div>

      {todos.length === 0 ? (
        <div data-testid="empty-state">No tasks yet</div>
      ) : (
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                aria-label={`Mark "${todo.text}"`}
                aria-checked={todo.completed ? 'true' : 'false'}
                checked={todo.completed}
                onChange={() => toggleTask(todo.id)}
              />
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      )}

      <div>
        <span>{activeTodos.length} {activeTodos.length === 1 ? 'task' : 'tasks'} remaining</span>
      </div>

      <div>
        <button role="tab" onClick={() => setFilter('All')}>All</button>
        <button role="tab" onClick={() => setFilter('Active')}>Active</button>
        <button role="tab" onClick={() => setFilter('Done')}>Done</button>
      </div>
      <button onClick={clearCompleted}>Clear completed</button>
    </div>
  );
}
