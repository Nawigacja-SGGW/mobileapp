import { Stack, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Login() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);
  const { t } = useTranslation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePassword2Visibility = () => {
    setIsPassword2Visible(!isPassword2Visible);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: 20,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    boldedText: {
      color: '#003228',
      fontSize: 12,
      textAlign: 'right',
      textDecorationLine: 'underline',
      marginTop: 10,
      fontWeight: 700,
    },
    text: {
      color: '#003228',
      fontSize: 13,
      textAlign: 'center',
      fontWeight: 500,
    },
  });
  
  return (
    <>
      <Stack.Screen options={{ title: t('login.screenTitle') }} />
      <View style={styles.container}>
        <Logo/>

        <View style={styles.content}>
          <AppInput
            label = {t('login.email.label')}
            placeholder = {t('login.email.placeholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" 
            />

          <AppInput
            label = {t('login.username.label')}
            placeholder = {t('login.username.placeholder')}
            value={username}
            onChangeText={setUsername}
            keyboardType="default" 
            />

          <AppSecureInput
            label= {t('login.password.label')}
            placeholder= {t('login.password.placeholder')}
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            />

          <AppSecureInput
            label= {t('login.confirmPassword.label')}
            placeholder= {t('login.confirmPassword.placeholder')}
            value={password2}
            onChangeText={setPassword2}
            keyboardType="default"
            isPasswordVisible={isPassword2Visible}
            togglePasswordVisibility={togglePassword2Visibility}
            />

          <Link href={{ pathname: '/login' }} asChild>
            <AppButton title={t('login.signUpButton')} />
          </Link>
        </View>
      </View>
    </>
  );
}