"use client";

import { useEffect, useState } from "react";

import { getTodos } from "@/lib/api";
import type { Todo } from "@/lib/types";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError("Could not load todos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Todos</h1>
      <TodoForm onCreated={(todo) => setTodos((prev) => [todo, ...prev])} />
      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdated={(updated) =>
                setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
              }
              onDeleted={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
