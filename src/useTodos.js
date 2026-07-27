import { useState, useEffect } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prevTodos) => [...prevTodos, { text, completed: false }]);
  };

  const toggleCompleted = (text) => {
    setTodos((prevTodos) => prevTodos.map((todo) => todo.text === text ? { ...todo, completed: !todo.completed } : todo));
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return { todos, addTodo, toggleCompleted, clearCompleted };
};

export default useTodos;