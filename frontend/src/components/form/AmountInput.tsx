import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { globalStyles } from '../../theme/globalStyles';
import { colors } from '../../theme/colors';

type FormData = {
  fromAccount: string;
  toAccount: string;
  currency: string;
  amount: string;
};

type Props = {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  international?: boolean;
};

export default function AmountInput({ control, errors, international }: Props) {
  return (
    <Controller
      control={control}
      name="amount"
      render={({ field: { onChange, value } }) => (
        <View style={globalStyles.inputContainer}>
          <TextInput
            label={`Amount ${international ? '(in target currency)' : '(NOK)'}`}
            value={value}
            theme={{ colors: { onSurfaceVariant: colors.white } }}
            onChangeText={onChange}
            keyboardType="numeric"
            style={globalStyles.input}
            underlineColor={colors.primary}
            activeUnderlineColor={colors.underline}
            textColor={colors.white}
          />
          {errors.amount && (
            <Text style={globalStyles.errorText}>{errors.amount.message}</Text>
          )}
        </View>
      )}
    />
  );
}
