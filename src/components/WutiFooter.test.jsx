import React from 'react';
import { render, screen } from '@testing-library/react';
import WutiFooter from './WutiFooter';

describe('WutiFooter', () => {
  it('renders the WutiSkill footer links', () => {
    render(<WutiFooter />);

    expect(screen.getByText(`© ${new Date().getFullYear()} WutiSkill Inc. Tous droits réservés.`)).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Pied de page' });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "Centre d'aide" })).toHaveAttribute('href', '/help');
    expect(screen.getByRole('link', { name: 'Conditions' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Confidentialité' })).toHaveAttribute('href', '/privacy');
  });
});
