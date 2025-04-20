import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { globalStyles } from '../../theme/globalStyles';
import { colors } from '../../theme/colors';

type FormData = {
  toAccount: string;
  currency: string;
  amount: string;
  fromAccount: string;
};

type Props = {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  international?: boolean;
};

export default function ToAccountInput({
  control,
  errors,
  international,
}: Props) {
  return (
    <Controller
      control={control}
      name="toAccount"
      render={({ field: { onChange, value } }) => (
        <View style={globalStyles.inputContainer}>
          <TextInput
            label={`To account${international ? ' (IBAN)' : ''}`}
            value={value}
            theme={{ colors: { onSurfaceVariant: 'white' } }}
            onChangeText={onChange}
            style={globalStyles.input}
            underlineColor={colors.underline}
            activeUnderlineColor={colors.underline}
            textColor={colors.white}
          />
          {errors.toAccount && (
            <Text style={globalStyles.errorText}>
              {errors.toAccount.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
