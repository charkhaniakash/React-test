import React, { useState } from 'react';
import useTodos from './useTodos';
import useFilters from './useFilters';

function App() {
  const { todos, addTodo, toggleCompleted, clearCompleted } = useTodos();
  const { filter, setFilter, filteredTodos } = useFilters(todos);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    addTodo({ text: inputValue, completed: false });
    setInputValue('');
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h1>My Tasks</h1>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Add a new task...'
      />
      <button aria-label="Add task" onClick={handleAddTodo}>Add task</button>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <input
              type='checkbox'
              aria-label={`Mark "${todo.text}"`}
              aria-checked={todo.completed}
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.text)}
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
      <div>
        <button role='tab' onClick={() => setFilter('all')}>All</button>
        <button role='tab' onClick={() => setFilter('active')}>Active</button>
        <button role='tab' onClick={() => setFilter('done')}>Done</button>
      </div>
      <p>{activeCount} task{activeCount === 1 ? '' : 's'} remaining</p>
      <button onClick={clearCompleted}>Clear completed</button>
      {filteredTodos.length === 0 && (
        <p data-testid='empty-state'>No tasks yet</p>
      )}
    </div>
  );
}

export default App;