import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  toggleTodoDone,
  updateTodo,
} from "../../../api/todos";
import type { Todo, TodoInput } from "../types";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTodos();
  }, [loadTodos]);

  const addTodo = useCallback(async (payload: TodoInput) => {
    try {
      const created = await createTodo(payload);
      setTodos((prev) => [created, ...prev]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
    }
  }, []);

  const editTodo = useCallback(async (id: string, payload: TodoInput) => {
    try {
      const updated = await updateTodo(id, payload);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updated : todo))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
    }
  }, []);

  const toggleDone = useCallback(async (id: string) => {
    try {
      const updated = await toggleTodoDone(id);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updated : todo))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle todo");
    }
  }, []);

  const removeTodo = useCallback(async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  }, []);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.done).length;
    return { total, completed };
  }, [todos]);

  return {
    todos,
    loading,
    error,
    stats,
    refresh: loadTodos,
    addTodo,
    editTodo,
    toggleDone,
    removeTodo,
  };
};
