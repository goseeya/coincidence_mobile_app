import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, Dialog, Portal } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { globalStyles } from '../../theme/globalStyles';
import { colors } from '../../theme/colors';

type Props = {
  type: 'error' | 'success';
  visible: boolean;
  setVisible: (visible: boolean) => void;
  message: string;
};

const CustomDialog = ({ visible, setVisible, message, type }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClose = () => {
    setVisible(false);
    if (type === 'success') {
      navigation.navigate('Home');
    }
  };

  const dialogTitle = type === 'success' ? 'Success' : 'Error';

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleClose}
        style={globalStyles.dialogContainer}
      >
        <Dialog.Title style={globalStyles.dialogTitle}>
          {dialogTitle}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={globalStyles.dialogMessage}>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={handleClose}
            buttonColor={colors.primary}
            textColor={colors.white}
            style={globalStyles.dialogButton}
          >
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
