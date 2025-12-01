'use client';

import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        {completedCount} of {todos.length} completed
      </div>
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
