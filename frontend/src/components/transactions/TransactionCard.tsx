import React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import { Transaction } from '../../../api/transactions';
import { colors } from '../../theme/colors';

export const TransactionCard = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardText}>From: {transaction.fromAccount}</Text>
        {transaction.toAccount && (
          <Text style={styles.cardText}>To: {transaction.toAccount}</Text>
        )}
        <Text style={styles.cardText}>
          Amount: {transaction.amount} {transaction.currency}
        </Text>
        {transaction.currency !== 'NOK' && transaction.nokValue && (
          <Text style={styles.cardText}>
            NOK amount: {transaction.nokValue.toFixed(2)} NOK
          </Text>
        )}
        <Text style={styles.cardText}>
          Date: {new Date(transaction.date).toLocaleString('no-NO')}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FF74C8',
    marginBottom: 12,
    borderRadius: 14,
    padding: 10,
  },
  cardText: {
    color: colors.white,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
