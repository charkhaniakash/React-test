import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

beforeEach(() => {
  localStorage.clear()
})

describe('App', () => {
  it('renders the app header', () => {
    render(<App />)
    expect(screen.getByText('My Tasks')).toBeInTheDocument()
  })

  it('shows empty state when no todos exist', () => {
    render(<App />)
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
  })

  it('adds a new todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Buy groceries')
    await user.click(screen.getByLabelText('Add task'))

    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(screen.getByText('1 task remaining')).toBeInTheDocument()
  })

  it('does not add empty todos', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByLabelText('Add task'))
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('toggles a todo as completed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Read a book')
    await user.click(screen.getByLabelText('Add task'))

    const checkbox = screen.getByRole('checkbox', { name: /Mark "Read a book"/ })
    await user.click(checkbox)

    expect(checkbox).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByText('0 tasks remaining')).toBeInTheDocument()
  })

  it('filters active todos', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')

    await user.type(input, 'Task one')
    await user.click(screen.getByLabelText('Add task'))

    await user.type(input, 'Task two')
    await user.click(screen.getByLabelText('Add task'))

    // Complete "Task one"
    await user.click(screen.getByRole('checkbox', { name: /Mark "Task one"/ }))

    // Filter to active
    await user.click(screen.getByRole('tab', { name: 'Active' }))

    expect(screen.getByText('Task two')).toBeInTheDocument()
    expect(screen.queryByText('Task one')).not.toBeInTheDocument()
  })

  it('filters completed todos', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')

    await user.type(input, 'Task one')
    await user.click(screen.getByLabelText('Add task'))

    await user.type(input, 'Task two')
    await user.click(screen.getByLabelText('Add task'))

    await user.click(screen.getByRole('checkbox', { name: /Mark "Task one"/ }))

    await user.click(screen.getByRole('tab', { name: 'Done' }))

    expect(screen.getByText('Task one')).toBeInTheDocument()
    expect(screen.queryByText('Task two')).not.toBeInTheDocument()
  })

  it('clears completed todos', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Finish project')
    await user.click(screen.getByLabelText('Add task'))

    await user.click(screen.getByRole('checkbox', { name: /Mark "Finish project"/ }))
    await user.click(screen.getByText('Clear completed'))

    expect(screen.queryByText('Finish project')).not.toBeInTheDocument()
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('persists todos to localStorage', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Persist me')
    await user.click(screen.getByLabelText('Add task'))

    unmount()

    render(<App />)
    expect(screen.getByText('Persist me')).toBeInTheDocument()
  })
})
