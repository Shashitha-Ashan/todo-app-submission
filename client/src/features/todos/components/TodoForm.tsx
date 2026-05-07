import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { TodoInput } from "../types";

type TodoFormProps = {
  onSubmit: (payload: TodoInput) => Promise<void> | void;
  isSubmitting?: boolean;
};

const initialForm: TodoInput = { title: "", description: "" };

const TodoForm = ({ onSubmit, isSubmitting }: TodoFormProps) => {
  const [form, setForm] = useState<TodoInput>(initialForm);

  const handleChange =
    (field: keyof TodoInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) {
      return;
    }

    await onSubmit({
      title: form.title.trim(),
      description: form.description?.trim() || "",
    });

    setForm(initialForm);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__fields">
        <label className="todo-form__label">
          Title
          <input
            type="text"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={handleChange("title")}
            required
          />
        </label>
        <label className="todo-form__label">
          Description
          <textarea
            placeholder="Add a short note (optional)"
            value={form.description}
            onChange={handleChange("description")}
            rows={3}
          />
        </label>
      </div>
      <button
        className="button button--primary"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving…" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
