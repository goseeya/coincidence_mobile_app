module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|@react-native-dropdown-picker|react-native-dropdown-picker|@testing-library/react-native|@react-navigation)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};