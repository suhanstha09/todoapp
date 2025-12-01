'use client';

import { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Add
      </button>
    </form>
  );
}
