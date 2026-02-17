import React from "react";
import TodoItem from "./TodoItem";

// PUBLIC_INTERFACE
export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onStartEdit,
  onCancelEdit,
  onSaveEdit
}) {
  /** List wrapper for todo items. */
  if (todos.length === 0) {
    return (
      <div className="emptyState" role="status" aria-live="polite">
        <div className="emptyTitle">No quests here.</div>
        <div className="emptyHint">Add a task and start your run.</div>
      </div>
    );
  }

  return (
    <ul className="todoList" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onStartEdit={() => onStartEdit(t.id)}
          onCancelEdit={() => onCancelEdit(t.id)}
          onSaveEdit={(nextText) => onSaveEdit(t.id, nextText)}
        />
      ))}
    </ul>
  );
}
