import React from "react";
import { Button } from "react-native-paper";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => (
  <Button
    icon="logout"
    mode="outlined"
    onPress={onLogout}
    style={styles.button}
    labelStyle={styles.label}
  >
    Logout
  </Button>
);

const styles = {
  button: {
    marginBottom: 12,
    borderColor: colors.white,
    borderWidth: 1,
  },
  label: {
    color: colors.white,
    fontSize: spacing.md,
  },
};

export default LogoutButton;
