export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type NewTodo = Omit<Todo, "id" | "created_at" | "updated_at">;

export type TodoUpdate = Partial<NewTodo>;
