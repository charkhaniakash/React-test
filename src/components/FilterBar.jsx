const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
]

export default function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="filters" role="tablist" aria-label="Filter tasks">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          id={`filter-${key}`}
          className={`filter-btn${filter === key ? ' active' : ''}`}
          onClick={() => onFilterChange(key)}
          role="tab"
          aria-selected={filter === key}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
