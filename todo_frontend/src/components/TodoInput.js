import React, { useEffect, useRef, useState } from "react";

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** Input form for creating new todos. */
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Autofocus without direct DOM querying.
    inputRef.current?.focus();
  }, []);

  function submit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <form className="todoInput" onSubmit={submit}>
      <label className="srOnly" htmlFor="new-todo">
        Add a task
      </label>
      <input
        id="new-todo"
        ref={inputRef}
        className="todoTextInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a task… (e.g., Beat the final boss)"
        maxLength={120}
        autoComplete="off"
      />
      <button className="btn btnPrimary" type="submit">
        Add
      </button>
    </form>
  );
}
