import React from 'react';
import { Card } from 'react-native-paper';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatAccountNumber } from '../../utils';
import { globalStyles } from '../../theme/globalStyles';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { StyleSheet } from 'react-native';

const AccountCard = ({
  name,
  number,
  balance,
}: {
  name: string;
  number: string;
  balance: number;
}) => (
  <Card style={globalStyles.card}>
    <Card.Title
      title={name}
      subtitle={formatAccountNumber(number)}
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
    />
    <Card.Content style={styles.content}>
      <Icon
        name="cash"
        testID="icon-cash"
        size={26}
        color={colors.white}
        style={{ marginRight: 8 }}
      />
      <Text style={styles.amount}>{balance.toFixed(2)} NOK</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: spacing.md,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.white,
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '500',
  },
});

export default AccountCard;
