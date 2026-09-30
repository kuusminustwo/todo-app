"use client";

import { useEffect, useState } from "react";

import { getTodos } from "@/lib/api";
import type { Todo } from "@/lib/types";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200)
  const emptyMessage = search ? "No todos match your search." : "No todos yet.";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    let ignore = false

    getTodos(debouncedSearch)
      .then((data) => {
        if (!ignore) setTodos(data);
      })
      .catch(() => {
        if (!ignore) setError("Could not load todos")
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      });

    return () => { ignore = true; };
  }, [debouncedSearch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Todos</h1>
      <TodoForm onCreated={(todo) => setTodos((prev) => [todo, ...prev])} />
      <input
        value={search}
        onChange={handleChange}
        placeholder="Search"
        className="w-full rounded border p-2 mb-4"
      />
      {todos.length === 0 ? (
        <p>{emptyMessage}</p>
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
