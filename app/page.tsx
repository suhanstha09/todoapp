'use client';

import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error);
      }
    }
    setMounted(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <p className="text-gray-600 mb-8">Stay organized and productive</p>
          
          <TodoInput onAddTodo={addTodo} />
          
          {mounted && (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
        </div>
      </div>
    </main>
  );
}
