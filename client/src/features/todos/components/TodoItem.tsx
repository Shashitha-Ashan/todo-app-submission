import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Todo, TodoInput } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => Promise<void> | void;
  onUpdate: (id: string, payload: TodoInput) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
};

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<TodoInput>({
    title: todo.title,
    description: todo.description || "",
  });

  const handleChange =
    (field: keyof TodoInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSave = async () => {
    await onUpdate(todo._id, {
      title: draft.title.trim(),
      description: draft.description?.trim() || "",
    });
    setIsEditing(false);
  };

  return (
    <article className={`todo-item ${todo.done ? "todo-item--done" : ""}`}>
      <header>
        <div className="todo-item__title">
          <button
            className="todo-item__check"
            onClick={() => onToggle(todo._id)}
            aria-label="Toggle done"
          >
            {todo.done ? "✓" : ""}
          </button>
          {isEditing ? (
            <input
              value={draft.title}
              onChange={handleChange("title")}
              className="todo-item__title-input"
            />
          ) : (
            <h3>{todo.title}</h3>
          )}
        </div>
        <div className="todo-item__actions">
          {isEditing ? (
            <>
              <button
                className="button button--ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className="button button--primary" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button
              className="button button--ghost"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
          <button
            className="button button--danger"
            onClick={() => onDelete(todo._id)}
          >
            Delete
          </button>
        </div>
      </header>
      {isEditing ? (
        <textarea
          value={draft.description}
          onChange={handleChange("description")}
          rows={3}
        />
      ) : (
        <p className="todo-item__description">
          {todo.description || "No description"}
        </p>
      )}
      <footer>
        <span>{todo.done ? "Completed" : "In progress"}</span>
      </footer>
    </article>
  );
};

export default TodoItem;
