import React from 'react';
import useTodos from './useTodos';
import useFilters from './useFilters';

function App() {
  const { todos, addTodo, toggleCompleted, clearCompleted } = useTodos();
  const { filter, setFilter } = useFilters();

  const handleAddTodo = (newTodo) => {
    if (!newTodo.trim()) return;
    addTodo(newTodo);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'done') return todo.completed;
  });

  return (
    <div>
      <h1>My Tasks</h1>
      <input
        type='text'
        value={''}
        onChange={(e) => handleAddTodo(e.target.value)}
        placeholder='Add a new task...'
      />
      <button onClick={() => handleAddTodo('')}>Add task</button>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.text)}
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('done')}>Done</button>
      </div>
      <button onClick={clearCompleted}>Clear completed</button>
      {filteredTodos.length === 0 && (
        <p data-testid='empty-state'>No tasks yet</p>
      )}
    </div>
  );
}

export default App;