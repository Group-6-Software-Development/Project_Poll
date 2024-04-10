import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';
import { MemoryRouter } from 'react-router-dom';

test('renders logo in Navbar', () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} setIsAuthenticated={() => {}} />
    </MemoryRouter>
  );

  const logoElement = screen.getByAltText('Logo');
  expect(logoElement).toBeInTheDocument();
});
