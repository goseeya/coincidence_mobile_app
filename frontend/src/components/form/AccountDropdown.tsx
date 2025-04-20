import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { globalStyles } from '../../theme/globalStyles';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { TickIcon } from '../icons/TickIcon';

interface AccountDropdownProps {
  accounts: {
    account_name: string;
    account_number: string;
    balance?: number;
  }[];
  value: string | null;
  setValue: (value: string | null) => void;
  loading: boolean;
  placeholder: string;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  accounts,
  value,
  setValue,
  loading,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  const items = accounts.map(({ account_name, balance, account_number }) => ({
    label: balance
      ? `${account_name}\n(saldo: ${balance.toFixed(2)} NOK)`
      : account_name,
    value: account_number,
  }));

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={(callback) => {
        const newValue = callback('');
        setValue(newValue);
      }}
      disabled={loading}
      zIndex={2000}
      zIndexInverse={1000}
      placeholder={placeholder}
      style={globalStyles.dropdown}
      textStyle={globalStyles.dropdownText}
      dropDownContainerStyle={globalStyles.dropdownContainer}
      listItemLabelStyle={globalStyles.dropdownText}
      placeholderStyle={globalStyles.dropdownPlaceholder}
      ArrowDownIconComponent={() => <ArrowDownIcon />}
      ArrowUpIconComponent={() => <ArrowUpIcon />}
      TickIconComponent={() => <TickIcon />}
    />
  );
};

export default AccountDropdown;
