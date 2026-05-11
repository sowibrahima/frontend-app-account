import React from 'react';
import { render, screen } from '@testing-library/react';
import WutiFooter from './WutiFooter';

describe('WutiFooter', () => {
  it('renders the WutiSkill footer links', () => {
    render(<WutiFooter />);

    expect(screen.getByText(`© ${new Date().getFullYear()} WutiSkill Inc. All rights reserved.`)).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Footer' });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Help center' })).toHaveAttribute('href', '/help');
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
  });
});
