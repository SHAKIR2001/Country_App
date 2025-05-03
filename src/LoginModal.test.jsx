import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from './components/LoginModal.jsx';

describe('LoginModal Component', () => {
  test('renders the login modal and handles user input', () => {
    const mockOnClose = jest.fn();
    const mockOnLogin = jest.fn();

    // Render the LoginModal component
    render(<LoginModal onClose={mockOnClose} onLogin={mockOnLogin} />);

    // Verify the modal title
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Verify that the onLogin function was called
    expect(mockOnLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
  });

  test('closes the modal when the close button is clicked', () => {
    const mockOnClose = jest.fn();

    // Render the LoginModal component
    render(<LoginModal onClose={mockOnClose} onLogin={jest.fn()} />);

    // Click the close button
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    // Verify that the onClose function was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});