import React from "react";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" }
];

// PUBLIC_INTERFACE
export default function FiltersBar({
  filter,
  onChangeFilter,
  remainingCount,
  totalCount,
  onClearCompleted,
  hasCompleted
}) {
  /** Filter controls + counters + clear completed action. */
  return (
    <div className="filtersBar" role="region" aria-label="Todo filters">
      <div className="filtersLeft">
        <div className="chipRow" role="tablist" aria-label="Filter tabs">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`chip ${filter === f.id ? "chipActive" : ""}`}
              onClick={() => onChangeFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="counts" aria-label="Todo counts">
          <span className="countBadge">{remainingCount} left</span>
          <span className="countSlash">/</span>
          <span className="countMuted">{totalCount} total</span>
        </div>
      </div>

      <button
        type="button"
        className="btn btnGhost"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </div>
  );
}
