import { fetchTransactions, Transaction } from '../../api/transactions';
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../theme/globalStyles';
import { colors } from '../theme/colors';
import CustomDialog from '../components/common/CustomDialog';
import { TransactionCard } from '../components/transactions/TransactionCard';
import { ActivityIndicator } from 'react-native-paper';

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');

  const showDialog = (message: string, type: 'success' | 'error') => {
    setDialogMessage(message);
    setDialogType(type);
    setDialogVisible(true);
  };

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch {
      showDialog('Error fetching transactions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionCard transaction={item} />
  );

  return (
    <View style={globalStyles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <>
          <FlatList
            data={transactions}
            keyExtractor={(item) =>
              item.id?.toString() ?? Math.random().toString()
            }
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No transactions yet.</Text>
            }
          />

          <CustomDialog
            visible={dialogVisible}
            setVisible={setDialogVisible}
            message={dialogMessage}
            type={dialogType}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
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
  emptyText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
