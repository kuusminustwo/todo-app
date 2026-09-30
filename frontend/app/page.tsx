"use client";

import { useEffect, useState } from "react";

import { getTodos } from "@/lib/api";
import type { Todo } from "@/lib/types";
import TodoForm from "@/components/TodoForm";

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
            <li key={todo.id} className="rounded border p-3">
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
