"use client";

import { useState } from "react";

import { createTodo } from "@/lib/api";
import type { Todo } from "@/lib/types";

type Props = {
    onCreated: (todo: Todo) => void;
}

export default function TodoForm({ onCreated }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!title.trim()) return;

        setSubmitting(true);
        setError(null);
        try {
            const todo = await createTodo({ title, description, completed: false });
            onCreated(todo);
            setTitle("");
            setDescription("");
        } catch {
            setError("Could not create todo");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded border p-2"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full rounded border p-2"
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
                type="submit"
                disabled={submitting}
                className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            >
                {submitting ? "Adding..." : "Add"}
            </button>
        </form>
    );
}
