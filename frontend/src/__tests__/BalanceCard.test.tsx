import React from 'react';
import { render } from '@testing-library/react-native';
import BalanceCard from '../components/home/BalanceCard';
import { colors } from '../theme/colors';

describe('BalanceCard', () => {
  it('renders the card with the correct title and icon', () => {
    const { getByText, getByTestId } = render(<BalanceCard balance={1000.0} />);

    getByText('Total Balance');

    const icon = getByTestId('icon-cash-multiple');
    expect(icon).toBeTruthy();
  });

  it('displays the balance when available', () => {
    const { getByText } = render(<BalanceCard balance={1500.0} />);

    getByText('1500 NOK');
  });

  it('displays "Loading..." when balance is null', () => {
    const { getByText } = render(<BalanceCard balance={null} />);

    getByText('Loading...');
  });

  it('applies correct styles for the balance text', () => {
    const { getByText } = render(<BalanceCard balance={2000.0} />);

    const balanceText = getByText('2000 NOK');
    expect(balanceText.props.style).toEqual(
      expect.objectContaining({
        fontSize: 28,
        color: colors.white,
        fontWeight: '600',
      }),
    );
  });
});
