import { useState } from 'react'
import { formatRelativeTime } from '../utils/storage'
import { CheckIcon, TrashIcon } from './Icons'

export default function TodoItem({ todo, onToggle, onDelete, isArchivedView, onRestore, onPermanentlyDelete }) {
  const [removing, setRemoving] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <li
      className={`todo-item${todo.completed ? ' completed' : ''}${removing ? ' removing' : ''}`}
      data-testid={`todo-item-${todo.id}`}
      onClick={() => onToggle(todo.id)}
      role="checkbox"
      aria-checked={todo.completed}
      aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle(todo.id)}
    >
      <div
        className={`checkbox${todo.completed ? ' checked' : ''}`}
      >
        <CheckIcon />
      </div>
      <span className="todo-text">{todo.text}</span>
      <span className="todo-timestamp">{formatRelativeTime(todo.createdAt)}</span>
      {showConfirmation ? (
        <div className="confirmation-buttons">
          <button
            className="confirm-yes"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
              setShowConfirmation(false);
            }}
            aria-label="Confirm delete"
          >
            Yes
          </button>
          <button
            className="confirm-no"
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmation(false);
            }}
            aria-label="Cancel delete"
          >
            No
          </button>
        </div>
      ) : (
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirmation(true);
          }}
          aria-label={`Delete "${todo.text}"`}
        >
          <TrashIcon />
        </button>
      )}
    </li>
  )
}