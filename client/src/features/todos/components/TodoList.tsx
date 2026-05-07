import type { Todo, TodoInput } from "../types";
import TodoItem from "./TodoItem";

type TodoListProps = {
  items: Todo[];
  onToggle: (id: string) => Promise<void> | void;
  onUpdate: (id: string, payload: TodoInput) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
};

const TodoList = ({ items, onToggle, onUpdate, onDelete }: TodoListProps) => {
  return (
    <div className="todo-list">
      {items.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
