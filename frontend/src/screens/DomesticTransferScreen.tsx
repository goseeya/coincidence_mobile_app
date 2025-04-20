import React from "react";
import { View, StyleSheet } from "react-native";
import TransferForm from "../components/form/TransferForm";
import { colors } from "../theme/colors";

const DomesticTransferScreen = () => {
  return (
    <View style={styles.container}>
      <TransferForm type="domestic" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primary,
  },
});

export default DomesticTransferScreen;
