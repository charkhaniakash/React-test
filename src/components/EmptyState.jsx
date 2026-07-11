import { EmptyIcon } from './Icons'

const messages = {
  all: { title: 'No tasks yet', sub: 'Add your first task above to get started' },
  active: { title: 'All caught up!', sub: 'No active tasks remaining' },
  completed: { title: 'Nothing completed', sub: 'Complete some tasks to see them here' },
}

export default function EmptyState({ filter }) {
  const msg = messages["all"]
  return (
    <div className="empty-state" data-testid="empty-state">
      <EmptyIcon />
      <p className="empty-title">{msg.title}</p>
      <p className="empty-sub">{msg.sub}</p>
    </div>
  )
}
