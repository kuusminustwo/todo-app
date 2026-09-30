"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { deleteTodo, getTodo, updateTodo } from "@/lib/api";
import type { Todo } from "@/lib/types";

export default function TodoDetail() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [todo, setTodo] = useState<Todo | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        let ignore = false

        getTodo(Number(id))
            .then((data) => {
                if (ignore) return;
                setTodo(data)
                setTitle(data.title)
                setDescription(data.description)
                setCompleted(data.completed)
            })
            .catch(() => {
                if (!ignore) setError("Todo not found")
            })

        return () => {
            ignore = true;
        };
    }, [id]);

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!todo || !title.trim()) return;

        setIsPending(true);
        try {
            const updated = await updateTodo(todo.id, { title, description, completed });
            setTodo(updated);
        } catch {
            setError("Could not save todo");
        } finally {
            setIsPending(false);
        }
    }

    function handleToggle() {
        if (!todo) return;

        setCompleted((prev) => !prev)
    }

    async function handleDelete() {
        if (!todo || !confirm("Delete this todo")) return;
        setIsPending(true);
        try {
            await deleteTodo(todo.id);
            router.push("/");
        } catch {
            setError("Could not delete todo");
            setIsPending(false);
        }
    }

    if (error && !todo) return <p className="p-6">{error}</p>
    if (!todo) return <p className="p-6">Loading...</p>

    return (
        <main className="mx-auto max-w-xl space-y-4 p-6">
            <Link href="/" className="text-blue-600">
                Back
            </Link>

            <form onSubmit={handleSave} className="space-y-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded border p-2"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border p-2"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={handleToggle}
                        disabled={isPending}
                    />
                    Completed
                </label>
                {error && <p className="text-red-600">{error}</p>}
                <div className="flex gap-2">
                    <button 
                        type="submit"
                        disabled={isPending}
                        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                    >
                        Save
                    </button>
                    <button 
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="rounded border px-4 py-2 text-red-600"
                    >
                        Delete
                    </button>
                </div>
            </form>

            <p>
                Created {new Date(todo.created_at).toLocaleString()}
            </p>
            <p>
                Updated {new Date(todo.updated_at).toLocaleString()}
            </p>
        </main>
    )
}
