import React from 'react';
import { render } from '@testing-library/react-native';
import { Transaction } from '../../api/transactions';
import { TransactionCard } from '../components/transactions/TransactionCard';
import { colors } from '../theme/colors';

const mockTransaction: Transaction = {
  fromAccount: '123456789',
  toAccount: '987654321',
  amount: 1000,
  currency: 'NOK',
  nokValue: 1000,
  type: 'domestic',
  date: '2025-04-19T10:00:00Z',
};

describe('TransactionCard', () => {
  it('renders transaction details correctly', () => {
    const { getByText } = render(
      <TransactionCard transaction={mockTransaction} />,
    );

    getByText('From: 123456789');

    getByText('To: 987654321');

    getByText('Amount: 1000 NOK');

    getByText('Date: 19.4.2025, 12:00:00');
  });

  it('does not display "To" if the toAccount is missing', () => {
    const { queryByText } = render(
      <TransactionCard transaction={{ ...mockTransaction, toAccount: '' }} />,
    );

    expect(queryByText('To:')).toBeNull();
  });

  it('does not display NOK value if currency is NOK', () => {
    const { queryByText } = render(
      <TransactionCard
        transaction={{
          ...mockTransaction,
          currency: 'NOK',
          nokValue: undefined,
        }}
      />,
    );

    expect(queryByText('NOK amount:')).toBeNull();
  });

  it('formats the transaction date correctly', () => {
    const { getByText } = render(
      <TransactionCard transaction={mockTransaction} />,
    );

    getByText('Date: 19.4.2025, 12:00:00');
  });

  it('applies the correct styles', () => {
    const { getByText } = render(
      <TransactionCard transaction={mockTransaction} />,
    );

    const cardText = getByText('From: 123456789');
    expect(cardText.props.style).toEqual(
      expect.objectContaining({
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
      }),
    );
  });
});
