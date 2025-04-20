import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import TransferForm from '../components/form/TransferForm';
import { globalStyles } from '../theme/globalStyles';

export default function OwnAccountTransferScreen() {
  return (
    <KeyboardAvoidingView style={globalStyles.container}>
      <TransferForm type="internal" />
    </KeyboardAvoidingView>
  );
}
