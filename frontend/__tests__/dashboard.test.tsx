import { render, screen } from '@testing-library/react'
import Dashboard from '../app/dashboard/page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('Dashboard', () => {
  it('renders dashboard heading', () => {
    render(<Dashboard />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard')
  })
})
