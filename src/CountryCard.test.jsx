import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from './components/CountryCard.jsx';
describe('CountryCard Component', () => {
  test('renders the country card and handles click events', () => {
    const mockOnClick = jest.fn();
    const country = {
      name: { common: 'Country Name' },
      flags: { svg: 'https://flagcdn.com/w320/us.png' },
      population: 331002651,
      region: 'Americas',
      capital: ['Washington, D.C.'],
    };

    // Render the CountryCard component
    render(<CountryCard country={country} onClick={mockOnClick} />);

    // Verify the country name is displayed
    expect(screen.getByText('Country Name')).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(screen.getByText('Country Name'));

    // Verify that the onClick function was called
    expect(mockOnClick).toHaveBeenCalled();
  });
});