import { useState } from 'react';

const useFilters = (todos) => {
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'done') return todo.completed;
  });

  return { filter, setFilter, filteredTodos };
};

export default useFilters;