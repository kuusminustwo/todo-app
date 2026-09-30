"use client";

import Link from "next/link";
import { useState } from "react";

import { deleteTodo, updateTodo } from "@/lib/api";
import type { Todo } from "@/lib/types";

type Props = {
    todo: Todo;
    onUpdated: (todo: Todo) => void;
    onDeleted: (id: number) => void;
}

export default function TodoItem({ todo, onUpdated, onDeleted }: Props) {
    const [isPending, setIsPending] = useState(false);

    async function handleToggle() {
        setIsPending(true);
        try {
            const updated = await updateTodo(todo.id, { completed: !todo.completed });
            onUpdated(updated);
        } finally {
            setIsPending(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this todo?")) return;
        setIsPending(true);
        try {
            await deleteTodo(todo.id);
            onDeleted(todo.id);
        } catch {
            setIsPending(false);
        }
    }

    return (
        <li className="flex items-center gap-3 rounded border p-3">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
                disabled={isPending}
            />
            <Link
                href={`/todos/${todo.id}`}
                className={todo.completed ? "flex-1 text-gray-400 line-through" : "flex-1"}
            >
                {todo.title}
            </Link>
            <button onClick={handleDelete} disabled={isPending} className="text-red-600">
                Delete
            </button>
        </li>
    );
}