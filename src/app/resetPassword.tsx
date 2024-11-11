import { Stack, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Login(email:string) {

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password2, setPassword2] = useState('');
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
    title:{
      fontSize: 24,
      fontWeight: 700,
      color: '#000',
      marginBottom:10,
    },
    text: {
      fontSize: 13,
      fontWeight: 300,
      color: '#000',
      marginBottom:10,
    },
  });
  
  return (
    <>
      <Stack.Screen options={{ title: t('login.screenTitle') }} />
      <View style={styles.container}>
        <Logo/>
        <View style={styles.content}>
          <Text style={styles.title}>{t('login.resetPassword')}</Text>
          <Text style={styles.text}>{t('login.resetPasswordText')+email}</Text>

          <AppSecureInput
            label= {t('login.newPassword.label')}
            placeholder= {t('login.newPassword.placeholder')}
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            />

          <AppSecureInput
            label= {t('login.confirmNewPassword.label')}
            placeholder= {t('login.confirmNewPassword.placeholder')}
            value={password2}
            onChangeText={setPassword2}
            keyboardType="default"
            isPasswordVisible={isPassword2Visible}
            togglePasswordVisibility={togglePassword2Visibility}
            />

          <Link href={{ pathname: '/' }} asChild>
            <AppButton title={t('login.resetButton')} />
          </Link>
        </View>
      </View>
    </>
  );
}