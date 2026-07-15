export default function TodoItem({ todo, onToggle, onDelete, removing }) {

  return (
    <li
      className={`todo-item${todo.completed ? ' completed' : ''}${removing ? ' removing' : ''}`}
      data-testid={`todo-item-${todo.id}`}
    >
      <div
        className={`checkbox${todo.completed ? ' checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle(todo.id)}
      >
        <CheckIcon />
      </div>
      <span className="todo-text">{todo.text}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        <TrashIcon />
      </button>
    </li>
  )
}
