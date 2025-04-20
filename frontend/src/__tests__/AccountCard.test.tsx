import React from 'react';
import { render } from '@testing-library/react-native';
import AccountCard from '../components/home/AccountCard';
import { formatAccountNumber } from './../utils';

jest.mock('./../utils', () => ({
  formatAccountNumber: jest.fn().mockReturnValue('12341234'),
}));

describe('AccountCard', () => {
  it('renders account card with correct details', () => {
    const { getByText } = render(
      <AccountCard
        name="Savings for a bag"
        number="123456789"
        balance={15000000.0}
      />,
    );

    getByText('Savings for a bag');
    expect(formatAccountNumber).toHaveBeenCalledWith('123456789');
    getByText('12341234');
    getByText('15000000.00 NOK');
  });

  it('displays the correct balance with two decimal places', () => {
    const { getByText } = render(
      <AccountCard
        name="Investment account"
        number="123456789"
        balance={1234.5}
      />,
    );
    getByText('1234.50 NOK');
  });

  it('displays an icon next to the balance', () => {
    const { getByTestId } = render(
      <AccountCard
        name="Standard account"
        number="123456789"
        balance={1500.0}
      />,
    );
    const icon = getByTestId('icon-cash');
    expect(icon).toBeTruthy();
  });
});
