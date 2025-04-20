export type RootStackParamList = {
    "Home": undefined;
    "Domestic Transfer": undefined;
    "International Transfer": undefined;
    "OwnAccount Transfer": undefined;
    "Transaction History": undefined;
    "Login": undefined;
  };

export type Account = {
  account_number: string;
  account_name: string;
  balance?: number;
};