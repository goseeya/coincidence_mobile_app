import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    marginTop: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 40,
  },
  errorText: {
    backgroundColor: colors.error,
    color: colors.white,
    padding: spacing.xs,
    borderRadius: 8,
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.buttonBackground,
  },
  buttonLabel: {
    color: colors.buttonText,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: "#FF74C8",
    borderWidth: 0,
    minHeight: 48,
  },
  dropdownText: {
    color: colors.white,
    fontSize: 16,
  },
  dropdownPlaceholder: {
    color: colors.white,
  },
  dropdownContainer: {
    backgroundColor: "#fc62c0",
    borderWidth: 0,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  secondaryButton: {
    marginVertical: 5,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    marginTop: 30,
  },
  arrowIconStyle: {
    tintColor: colors.white,
  },
  tickIconStyle: {
    tintColor: colors.white,
  },
  dialogContainer: {
    backgroundColor: "#FF5DBA",
    borderRadius: 12,
  },
  dialogTitle: {
    color: colors.white,
  },
  dialogMessage: {
    color: colors.white,
  },
  dialogButton: {
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#FF74C8",
    marginBottom: 8,
    borderRadius: 12,
  },
});


  

  
