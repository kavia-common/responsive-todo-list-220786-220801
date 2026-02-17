import { useEffect, useState } from "react";

/**
 * Safely parse JSON from localStorage.
 * Falls back to a default value when missing or invalid.
 */
function readJson(key, defaultValue) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

/**
 * Safely write JSON to localStorage.
 */
function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota/security errors; state still works in-memory.
  }
}

// PUBLIC_INTERFACE
export function useLocalStorageState(key, defaultValue) {
  /**
   * React state synced to localStorage.
   *
   * @param {string} key localStorage key
   * @param {*} defaultValue value used when key is missing/invalid
   * @returns {[any, Function]} tuple of state and setState
   */
  const [state, setState] = useState(() => readJson(key, defaultValue));

  useEffect(() => {
    writeJson(key, state);
  }, [key, state]);

  return [state, setState];
}
