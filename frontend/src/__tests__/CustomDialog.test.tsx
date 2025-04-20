import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomDialog from '../components/common/CustomDialog';
import { PaperProvider } from 'react-native-paper';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('CustomDialog', () => {
  const setVisible = jest.fn();

  it('renders with success type and navigates to Home on OK', () => {
    const { getByText } = render(
      <PaperProvider>
        <CustomDialog
          visible={true}
          setVisible={setVisible}
          message="Operation completed!"
          type="success"
        />
      </PaperProvider>,
    );

    expect(getByText('Success')).toBeTruthy();
    expect(getByText('Operation completed!')).toBeTruthy();

    fireEvent.press(getByText('OK'));

    expect(setVisible).toHaveBeenCalledWith(false);
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});
