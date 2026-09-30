import type { NewTodo, Todo, TodoUpdate } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTodos(search?: string): Promise<Todo[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const res = await fetch(`${API_URL}/todos/?${params}`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  return res.json();
}

export async function createTodo(data: NewTodo): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function updateTodo(id: number, data: TodoUpdate): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/todos/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}
