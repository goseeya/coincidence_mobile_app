import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SendButton } from '../components/form/SendButton';

describe('SendButton', () => {
  it('renders correctly with label "Send"', () => {
    const { getByText } = render(<SendButton onPress={() => {}} />);
    expect(getByText('Send')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<SendButton onPress={onPressMock} />);

    fireEvent.press(getByText('Send'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
