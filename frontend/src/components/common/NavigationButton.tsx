import React from "react";
import { Button } from "react-native-paper";
import { colors } from "../../theme/colors";
import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";

const NavigationButton = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) => (
  <Button
    mode="contained"
    onPress={onPress}
    icon={icon}
    style={styles.button}
    labelStyle={styles.label}
  >
    {label}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    marginBottom: spacing.sm,
    backgroundColor: colors.buttonBackground,
  },
  label: {
    color: colors.buttonText,
    fontWeight: "600",
    fontSize: spacing.md,
  },
});

export default NavigationButton;
