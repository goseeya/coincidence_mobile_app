import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import { StyleSheet } from 'react-native';
import { globalStyles } from '../theme/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { login } from '../../api/auth';
import CustomDialog from '../components/common/CustomDialog';

const loginSchema = z.object({
  username: z.string().min(1, 'Enter username'),
  password: z.string().min(1, 'Enter password'),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error'>('error');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const checkUserSession = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        navigation.replace('Home');
      }
      setLoading(false);
    };

    checkUserSession();
  }, []);

  const handleDialog = (message: string, type: 'success' | 'error') => {
    setDialogMessage(message);
    setDialogType(type);
    setDialogVisible(true);
  };

  const onSubmit = async ({ username, password }: LoginForm) => {
    try {
      await login(username, password);
      await AsyncStorage.setItem('user', username);
      navigation.replace('Home');
    } catch {
      handleDialog('Error logging in', 'error');
    }
  };

  const renderInput = (
    name: keyof LoginForm,
    label: string,
    secureTextEntry = false,
  ) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            style={globalStyles.input}
            underlineColor={colors.underline}
            activeUnderlineColor={colors.underline}
            textColor={colors.white}
            autoCapitalize="none"
            theme={{
              colors: {
                placeholder: colors.white,
                text: colors.white,
                primary: colors.primary,
                onSurfaceVariant: colors.white,
              },
            }}
          />
          {errors[name] && (
            <Text style={globalStyles.errorText}>{errors[name]?.message}</Text>
          )}
        </>
      )}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Card style={globalStyles.card}>
          <Card.Content>
            {renderInput('username', 'Username')}
            {renderInput('password', 'Password', true)}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              icon="login"
              style={[globalStyles.button, styles.button]}
              labelStyle={globalStyles.buttonLabel}
            >
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
      <CustomDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        message={dialogMessage}
        type={dialogType}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default LoginScreen;
