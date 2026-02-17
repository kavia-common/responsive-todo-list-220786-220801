import React, { useMemo, useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import FiltersBar from "./components/FiltersBar";
import TodoList from "./components/TodoList";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

function makeId() {
  // Good enough for client-side ids without extra dependencies.
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeTodos(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t) => t && typeof t === "object")
    .map((t) => ({
      id: typeof t.id === "string" ? t.id : makeId(),
      text: typeof t.text === "string" ? t.text : "",
      completed: Boolean(t.completed),
      isEditing: false
    }))
    .filter((t) => t.text.trim().length > 0);
}

// PUBLIC_INTERFACE
export default function App() {
  /** Retro-themed responsive Todo app with CRUD, filtering, and persistence. */
  const [todos, setTodos] = useLocalStorageState("retro_todos_v1", []);
  const [filter, setFilter] = useState("all");

  const safeTodos = useMemo(() => normalizeTodos(todos), [todos]);

  const visibleTodos = useMemo(() => {
    if (filter === "active") return safeTodos.filter((t) => !t.completed);
    if (filter === "completed") return safeTodos.filter((t) => t.completed);
    return safeTodos;
  }, [safeTodos, filter]);

  const remainingCount = useMemo(
    () => safeTodos.filter((t) => !t.completed).length,
    [safeTodos]
  );

  const hasCompleted = useMemo(
    () => safeTodos.some((t) => t.completed),
    [safeTodos]
  );

  function addTodo(text) {
    setTodos((prev) => [
      { id: makeId(), text, completed: false, isEditing: false },
      ...normalizeTodos(prev).map((t) => ({ ...t, isEditing: false }))
    ]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      normalizeTodos(prev).map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => normalizeTodos(prev).filter((t) => t.id !== id));
  }

  function startEdit(id) {
    setTodos((prev) =>
      normalizeTodos(prev).map((t) => ({ ...t, isEditing: t.id === id }))
    );
  }

  function cancelEdit(id) {
    setTodos((prev) =>
      normalizeTodos(prev).map((t) =>
        t.id === id ? { ...t, isEditing: false } : t
      )
    );
  }

  function saveEdit(id, nextText) {
    setTodos((prev) =>
      normalizeTodos(prev).map((t) =>
        t.id === id ? { ...t, text: nextText, isEditing: false } : t
      )
    );
  }

  function clearCompleted() {
    setTodos((prev) => normalizeTodos(prev).filter((t) => !t.completed));
  }

  return (
    <div className="app">
      <header className="topBar">
        <div className="brand">
          <div className="brandMark" aria-hidden="true">
            <span className="pixelDot" />
            <span className="pixelDot" />
            <span className="pixelDot" />
          </div>
          <div className="brandText">
            <h1 className="title">Retro Todo</h1>
            <p className="subtitle">A tiny quest log with local save.</p>
          </div>
        </div>

        <div className="kbdHint" aria-label="Keyboard hints">
          <span className="kbd">Enter</span> add/save <span className="dotSep" />
          <span className="kbd">Esc</span> cancel
        </div>
      </header>

      <main className="card" aria-label="Todo app">
        <TodoInput onAdd={addTodo} />

        <FiltersBar
          filter={filter}
          onChangeFilter={setFilter}
          remainingCount={remainingCount}
          totalCount={safeTodos.length}
          onClearCompleted={clearCompleted}
          hasCompleted={hasCompleted}
        />

        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onStartEdit={startEdit}
          onCancelEdit={cancelEdit}
          onSaveEdit={saveEdit}
        />
      </main>

      <footer className="footer">
        <span className="footerText">
          Tip: Keep it short, keep it sharp. Your tasks auto-save locally.
        </span>
      </footer>
    </div>
  );
}
