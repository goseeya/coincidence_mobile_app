import React from "react";
import { View } from "react-native";
import { globalStyles } from "../theme/globalStyles";
import TransferForm from "../components/form/TransferForm";

export default function InternationalTransferScreen() {
  return (
    <View style={globalStyles.container}>
      <TransferForm type="international" />
    </View>
  );
}