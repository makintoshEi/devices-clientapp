import { render, screen } from '@testing-library/react';
import App from './App';

test('renders no available options on table', () => {
  render(<App />);
  const linkElement = screen.getByText(/no available options/i);
  expect(linkElement).toBeInTheDocument();
});
