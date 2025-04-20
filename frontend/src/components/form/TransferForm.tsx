import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountDropdown from './AccountDropdown';
import { sendTransaction } from '../../../api/transactions';
import { fetchAccounts } from '../../../api/accounts';
import AmountInput from './AmountInput';
import ToAccountInput from './ToAccountInput';
import { colors } from '../../theme/colors';
import { SendButton } from './SendButton';
import CustomDialog from '../common/CustomDialog';
import { Account } from '../../types';
import CurrencyDropdown from './CurrencyDropdown';
import { getExchangeRateToNok } from '../../../api/international-transfer';
import { globalStyles } from '../../theme/globalStyles';
import { isValidIBAN } from 'ibantools';

const schemaDomestic = z.object({
  fromAccount: z.string().min(1, 'Enter source account number'),
  toAccount: z
    .string()
    .min(1, 'Enter destination account number')
    .transform((val) => val.replace(/[.\s]/g, ''))
    .refine((val) => /^\d{11}$/.test(val), {
      message: 'Destination account must be exactly 11 digits',
    }),
  currency: z.string().default('NOK') as z.ZodType<string>,
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a number greater than 0',
  }),
});

const schemaInternational = z.object({
  fromAccount: z.string().min(1, 'Enter source account number'),
  toAccount: z
    .string()
    .transform((val) => val.replace(/[.\s]/g, ''))
    .refine((val) => isValidIBAN(val), {
      message: 'Invalid IBAN format',
    }),
  currency: z.string().length(3).toUpperCase(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a number greater than 0',
  }),
});

type TransferType = 'internal' | 'international' | 'domestic';

type FormData = z.infer<typeof schemaDomestic | typeof schemaInternational>;

type Props = {
  type: TransferType;
};

const TransferForm = ({ type }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      type === 'international' ? schemaInternational : schemaDomestic,
    ),
    defaultValues: {
      currency: type === 'international' ? undefined : 'NOK',
    },
  });

  const [rate, setRate] = useState<number | null>(null);
  const [nokAmount, setNokAmount] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');

  const amount = watch('amount');
  const currency = watch('currency');
  const fromAccount = watch('fromAccount');
  const toAccount = watch('toAccount');

  const showDialog = (message: string, type: 'success' | 'error') => {
    setDialogMessage(message);
    setDialogType(type);
    setDialogVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  useEffect(() => {
    if (type !== 'international' || !currency || !amount) return;
    const fetchRate = async () => {
      try {
        const rate = await getExchangeRateToNok(currency);
        setRate(rate);
        setNokAmount(Number(amount) * rate);
      } catch {
        setRate(null);
        setNokAmount(null);
      }
    };
    fetchRate();
  }, [amount, currency, type]);

  const onSubmit = async (data: FormData) => {
    try {
      const transaction = {
        fromAccount: data.fromAccount,
        toAccount: data.toAccount,
        amount: Number(data.amount),
        nokValue: Number(data.amount),
        currency: type === 'international' ? data.currency! : 'NOK',
        type,
        date: new Date().toISOString(),
      };

      if (type === 'international') {
        const rate = await getExchangeRateToNok(data.currency!);
        transaction.nokValue = Number(data.amount) * rate;
      }

      await sendTransaction(transaction);
      showDialog('Transaction has been successfully sent!', 'success');
      reset();
      setRate(null);
      setNokAmount(null);
    } catch {
      showDialog('Error while saving transaction.', 'error');
    }
  };

  return (
    <>
      <View style={{ zIndex: 1 }}>
        <View style={{ zIndex: 3000 }}>
          <Controller
            control={control}
            name="fromAccount"
            render={({ field: { onChange, value } }) => {
              const filtered = accounts.filter(
                (acc) => acc.account_number.toString() !== toAccount,
              );
              const dropdownOptions = [
                {
                  account_name: 'From account',
                  account_number: '',
                  balance: 0,
                },
                ...filtered,
              ];
              return (
                <>
                  <AccountDropdown
                    accounts={type === 'internal' ? dropdownOptions : accounts}
                    value={value}
                    setValue={(val) => onChange(val)}
                    loading={loading}
                    placeholder="From account"
                  />
                  {errors.fromAccount && (
                    <Text style={globalStyles.errorText}>
                      {errors.fromAccount.message}
                    </Text>
                  )}
                </>
              );
            }}
          />
        </View>

        <Icon
          name="arrow-down"
          size={30}
          color={colors.white}
          style={{ alignSelf: 'center', marginTop: 12, marginBottom: 18 }}
        />

        {type === 'internal' ? (
          <Controller
            control={control}
            name="toAccount"
            render={({ field: { onChange, value } }) => {
              const filtered = accounts.filter(
                (acc) => acc.account_number.toString() !== fromAccount,
              );
              const dropdownOptions = [
                {
                  account_name: 'To account',
                  account_number: '',
                  balance: 0,
                },
                ...filtered,
              ];
              return (
                <>
                  <AccountDropdown
                    accounts={dropdownOptions}
                    value={value}
                    setValue={(val) => onChange(val)}
                    loading={loading}
                    placeholder="To account"
                  />
                  {errors['toAccount'] && (
                    <Text style={globalStyles.errorText}>
                      {errors['toAccount']?.message}
                    </Text>
                  )}
                </>
              );
            }}
          />
        ) : (
          <ToAccountInput
            control={control}
            errors={errors}
            international={type === 'international'}
          />
        )}

        {type === 'international' && (
          <CurrencyDropdown
            control={control}
            open={open}
            setOpen={setOpen}
            errors={errors}
          />
        )}

        <AmountInput
          control={control}
          errors={errors}
          international={type === 'international'}
        />

        {type === 'international' && rate && nokAmount !== null && (
          <Text style={styles.rateText}>
            Rate: {rate.toFixed(4)}. Amount in NOK: {nokAmount.toFixed(2)}
          </Text>
        )}

        <SendButton onPress={handleSubmit(onSubmit)} />
      </View>
      <CustomDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        message={dialogMessage}
        type={dialogType}
      />
    </>
  );
};

const styles = StyleSheet.create({
  rateText: {
    marginBottom: 10,
    fontSize: 16,
    color: colors.white,
  },
});

export default TransferForm;
