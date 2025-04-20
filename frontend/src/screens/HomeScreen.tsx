import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BalanceCard from '../components/home/BalanceCard';
import AccountCard from '../components/home/AccountCard';
import NavigationButton from '../components/common/NavigationButton';
import { Account, RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LogoutButton from '../components/common/LogoutButton';
import { fetchBalance } from '../../api/balance';
import { fetchAccounts } from '../../api/accounts';
import CustomDialog from '../components/common/CustomDialog';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [balance, setBalance] = useState<number | null>(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');

  const showDialog = (message: string, type: 'success' | 'error') => {
    setDialogMessage(message);
    setDialogType(type);
    setDialogVisible(true);
  };

  useEffect(() => {
    const getAccounts = async () => {
      setLoading(true);
      try {
        const data = await fetchAccounts();
        setAccounts(data);
      } catch {
        showDialog('Error fetching accounts', 'error');
      } finally {
        setLoading(false);
      }
    };

    const getBalance = async () => {
      setLoading(true);
      try {
        const data = await fetchBalance();
        setBalance(data.total_balance);
      } catch {
        showDialog('Error fetching balance', 'error');
      } finally {
        setLoading(false);
      }
    };

    getAccounts();
    getBalance();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator animating={true} />}
      <BalanceCard balance={balance} />

      {accounts.map((account: Account, index) => (
        <AccountCard
          key={index}
          name={account.account_name}
          number={account.account_number}
          balance={account.balance || 0}
        />
      ))}

      <NavigationButton
        icon="account-multiple"
        label="Domestic Transfer"
        onPress={() => navigation.navigate('Domestic Transfer')}
      />
      <NavigationButton
        icon="airplane"
        label="International Transfer"
        onPress={() => navigation.navigate('International Transfer')}
      />
      <NavigationButton
        icon="bank-transfer"
        label="Own Account Transfer"
        onPress={() => navigation.navigate('OwnAccount Transfer')}
      />
      <NavigationButton
        icon="history"
        label="Transaction History"
        onPress={() => navigation.navigate('Transaction History')}
      />
      <LogoutButton
        onLogout={async () => {
          await AsyncStorage.removeItem('user');
          navigation.replace('Login');
        }}
      />
      <CustomDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        message={dialogMessage}
        type={dialogType}
      />
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FF2D89',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
};

export default HomeScreen;
