import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LogoutButton from '../components/common/LogoutButton';

describe('LogoutButton', () => {
  it('renders correctly and triggers onLogout', () => {
    const mockOnLogout = jest.fn();

    const { getByText } = render(<LogoutButton onLogout={mockOnLogout} />);

    const button = getByText('Logout');
    expect(button).toBeTruthy();

    fireEvent.press(button);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
