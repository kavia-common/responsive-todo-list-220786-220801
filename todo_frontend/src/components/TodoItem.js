import React, { useEffect, useRef, useState } from "react";

// PUBLIC_INTERFACE
export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onStartEdit,
  onCancelEdit,
  onSaveEdit
}) {
  /** Single todo row with view/edit modes and actions. */
  const [draft, setDraft] = useState(todo.text);
  const editRef = useRef(null);

  useEffect(() => {
    setDraft(todo.text);
  }, [todo.text]);

  useEffect(() => {
    if (todo.isEditing) editRef.current?.focus();
  }, [todo.isEditing]);

  function submitEdit(e) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSaveEdit(trimmed);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      setDraft(todo.text);
      onCancelEdit();
    }
  }

  return (
    <li className={`todoItem ${todo.completed ? "todoItemCompleted" : ""}`}>
      <button
        type="button"
        className={`check ${todo.completed ? "checkOn" : ""}`}
        onClick={onToggle}
        aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
      >
        <span className="checkInner" aria-hidden="true" />
      </button>

      {!todo.isEditing ? (
        <>
          <div className="todoText" title={todo.text}>
            {todo.text}
          </div>
          <div className="todoActions">
            <button
              type="button"
              className="btn btnSmall btnGhost"
              onClick={onStartEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btnSmall btnDanger"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form className="editRow" onSubmit={submitEdit}>
          <label className="srOnly" htmlFor={`edit-${todo.id}`}>
            Edit todo
          </label>
          <input
            id={`edit-${todo.id}`}
            ref={editRef}
            className="todoTextInput"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={120}
            autoComplete="off"
          />
          <div className="todoActions">
            <button className="btn btnSmall btnPrimary" type="submit">
              Save
            </button>
            <button
              className="btn btnSmall btnGhost"
              type="button"
              onClick={() => {
                setDraft(todo.text);
                onCancelEdit();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
}
