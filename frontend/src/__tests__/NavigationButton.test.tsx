import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationButton from '../components/common/NavigationButton';

describe('NavigationButton', () => {
  it('renders correctly and triggers onPress', () => {
    const mockOnPress = jest.fn();
    const label = 'Go to Profile';
    const icon = 'account';

    const { getByText } = render(
      <NavigationButton label={label} icon={icon} onPress={mockOnPress} />,
    );

    const button = getByText(label);
    expect(button).toBeTruthy();

    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
