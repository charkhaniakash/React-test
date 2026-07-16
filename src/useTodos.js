import { useState, useEffect } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const newTodos = [...todos, { text: newTodo, completed: false }];
    setTodos(newTodos);
    setNewTodo('');
  };

  const handleToggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'done') return todo.completed;
  });

  return {
    todos,
    newTodo,
    filter,
    handleAddTodo,
    handleToggleCompleted,
    handleClearCompleted,
    setNewTodo,
    setFilter,
    filteredTodos
  };
};

export default useTodos;