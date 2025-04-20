import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import InternationalTransferScreen from "./src/screens/InternationalTransferScreen";
import DomesticTransferScreen from "./src/screens/DomesticTransferScreen";
import OwnAccountTransferScreen from "./src/screens/OwnAccountTransferScreen";
import { enableScreens } from "react-native-screens";
enableScreens();
import { colors } from "./src/theme/colors";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FF2D89",
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
              color: colors.white,
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="International Transfer"
            component={InternationalTransferScreen}
          />
          <Stack.Screen
            name="Domestic Transfer"
            component={DomesticTransferScreen}
          />
          <Stack.Screen
            name="OwnAccount Transfer"
            component={OwnAccountTransferScreen}
          />
          <Stack.Screen
            name="Transaction History"
            component={TransactionHistoryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
