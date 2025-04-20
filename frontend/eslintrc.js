export const root = true;
export const parser = '@typescript-eslint/parser';
export const plugins = ['@typescript-eslint', 'react', 'react-native', 'import'];
export const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier'
];
export const env = {
    'react-native/react-native': true,
};
export const settings = {
    react: {
        version: 'detect',
    },
};
  