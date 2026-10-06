import { act, render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PersonList from './PersonList';

// The list links to the add page, so it needs a router
const render = (ui) => rtlRender(<MemoryRouter>{ui}</MemoryRouter>);

const employee = (overrides = {}) => ({
  id: '1',
  name: 'Aino Virtanen',
  title: 'HR Manager',
  salary: 4200,
  phone: '040-1234567',
  email: 'aino@example.com',
  animal: 'Owl',
  startDate: '2015-09-29',
  location: 'Helsinki',
  department: 'Human Resources',
  skills: ['Recruiting'],
  ...overrides,
});

describe('PersonList states', () => {
  afterEach(() => vi.useRealTimers());

  it('shows a loading message while employees load', () => {
    render(<PersonList employees={[]} status="loading" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading employees');
    expect(screen.queryByText(/Waking up the demo server/)).not.toBeInTheDocument();
  });

  it('explains the server wake-up when loading takes longer than 3 seconds', () => {
    vi.useFakeTimers();
    render(<PersonList employees={[]} status="loading" />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText(/Waking up the demo server/)).toBeInTheDocument();
  });

  it('offers a retry when loading fails', async () => {
    const onRetry = vi.fn();
    render(<PersonList employees={[]} status="error" onRetry={onRetry} />);
    expect(screen.getByRole('alert')).toHaveTextContent("Couldn't load employees");
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows an empty state when there are no employees', () => {
    render(<PersonList employees={[]} status="ready" />);
    expect(screen.getByText(/No employees yet/)).toBeInTheDocument();
  });

  it('renders one card per employee', () => {
    render(
      <PersonList
        employees={[employee(), employee({ id: '2', name: 'Liina Koskinen' })]}
        status="ready"
      />
    );
    expect(screen.getByText(/Aino Virtanen/)).toBeInTheDocument();
    expect(screen.getByText(/Liina Koskinen/)).toBeInTheDocument();
  });
});

describe('PersonCard reminders', () => {
  afterEach(() => vi.useRealTimers());

  const renderOn = (today, startDate) => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(`${today}T12:00:00`));
    render(<PersonList employees={[employee({ startDate })]} status="ready" />);
  };

  it('shows a probation review reminder for a new hire', () => {
    renderOn('2026-10-04', '2026-08-01');
    expect(screen.getByText(/Schedule probation review/)).toBeInTheDocument();
    expect(screen.queryByText(/Schedule recognition meeting/)).not.toBeInTheDocument();
  });

  it('shows a recognition reminder in a 10-year milestone year', () => {
    renderOn('2026-10-04', '2016-03-01');
    expect(screen.getByText(/Schedule recognition meeting/)).toBeInTheDocument();
  });

  it('shows no reminder in an ordinary year', () => {
    renderOn('2026-10-04', '2023-01-15');
    expect(screen.queryByText(/Schedule/)).not.toBeInTheDocument();
  });
});
