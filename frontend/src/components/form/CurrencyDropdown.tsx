import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { availableCurrencies } from '../../constants';
import { globalStyles } from '../../theme/globalStyles';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { TickIcon } from '../icons/TickIcon';

type FormData = {
  fromAccount: string;
  toAccount: string;
  currency: string;
  amount: string;
};

type Props = {
  control: Control<FormData>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FieldErrors<FormData>;
};

export default function CurrencyDropdown({
  control,
  open,
  setOpen,
  errors,
}: Props) {
  return (
    <Controller
      control={control}
      name="currency"
      render={({ field: { onChange, value } }) => (
        <View style={{ zIndex: 2000 }}>
          <DropDownPicker
            items={availableCurrencies}
            open={open}
            value={value}
            setOpen={setOpen}
            setValue={(callback) => {
              const newValue = callback('');
              onChange(newValue);
            }}
            placeholder="Select currency"
            style={globalStyles.dropdown}
            textStyle={globalStyles.dropdownText}
            placeholderStyle={globalStyles.dropdownPlaceholder}
            dropDownContainerStyle={globalStyles.dropdownContainer}
            ArrowDownIconComponent={() => <ArrowDownIcon />}
            ArrowUpIconComponent={() => <ArrowUpIcon />}
            TickIconComponent={() => <TickIcon />}
          />
          {errors.currency && (
            <Text style={globalStyles.errorText}>
              {errors.currency.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
