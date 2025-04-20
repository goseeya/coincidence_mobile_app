import React from 'react';
import { Button } from "react-native-paper";
import { globalStyles } from "../../theme/globalStyles";

export const SendButton = ({ onPress }: { onPress: () => void }) => (
  <Button
    mode="contained"
    onPress={onPress}
    style={globalStyles.button}
    labelStyle={globalStyles.buttonLabel}
  >
    Send
  </Button>
);
