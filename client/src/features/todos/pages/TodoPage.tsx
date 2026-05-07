import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useTodos } from "../hooks/useTodos";

const TodoPage = () => {
  const {
    todos,
    loading,
    error,
    stats,
    addTodo,
    editTodo,
    toggleDone,
    removeTodo,
    refresh,
  } = useTodos();

  return (
    <section className="todo-page">
      <header className="todo-page__header">
        <div>
          <h1>TODO Dashboard</h1>
        </div>
        <div className="todo-page__stats">
          <div>
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div>
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
        </div>
      </header>

      <TodoForm onSubmit={addTodo} />

      <section className="todo-page__content">
        <div className="todo-page__toolbar">
          <h2>Recent Todos</h2>
          <button className="button button--ghost" onClick={refresh}>
            Refresh
          </button>
        </div>

        {loading && <p className="todo-page__status">Loading todos…</p>}
        {!loading && error && (
          <div className="todo-page__error">
            <p>{error}</p>
            <button className="button button--primary" onClick={refresh}>
              Try Again
            </button>
          </div>
        )}
        {!loading && !error && todos.length === 0 && (
          <div className="todo-page__empty">
            <h3>No todos yet</h3>
            <p>Add your first todo to get started.</p>
          </div>
        )}
        {!loading && !error && todos.length > 0 && (
          <TodoList
            items={todos}
            onToggle={toggleDone}
            onUpdate={editTodo}
            onDelete={removeTodo}
          />
        )}
      </section>
    </section>
  );
};

export default TodoPage;
