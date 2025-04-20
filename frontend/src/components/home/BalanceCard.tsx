import React from "react";
import { Card } from "react-native-paper";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

const BalanceCard = ({ balance }: { balance: number | null }) => (
  <Card style={styles.card}>
    <Card.Title title="Total Balance" titleStyle={styles.title} />
    <Card.Content style={styles.content}>
      <Icon
        name="cash-multiple"
        testID="icon-cash-multiple"
        size={26}
        color={colors.white}
        style={{ marginRight: 8 }}
      />
      <Text style={styles.balanceText}>
        {balance !== null ? `${balance.toFixed(2)} NOK` : "Loading..."}
      </Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FF5DBA",
    marginBottom: 8,
    borderRadius: 14,
  },
  title: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceText: {
    fontSize: 28,
    color: colors.white,
    fontWeight: "600",
  },
});

export default BalanceCard;
