import { Stack, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Login() {

  const [email, setEmail] = useState('');
  const { t } = useTranslation();

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
    bottomText: {
      color: '#003228',
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 700,
    },
  });
  
  return (
    <>
      <Stack.Screen options={{ title: t('login.screenTitle') }} />
      <View style={styles.container}>
        <Logo/>
        <View style={styles.content}>
          <Text style={styles.title}>{t('login.forgotPassword')}</Text>
          <Text style={styles.text}>{t('login.forgotPasswordText')}</Text>

          <AppInput
            label = {t('login.email.label')}
            placeholder = {t('login.email.placeholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" 
            />

          <Link href={{ pathname: '/' }} asChild>
            <AppButton title={t('login.sendButton')} />
          </Link>

          <Link href={{ pathname: '/login' }} asChild>
            <Text style={styles.bottomText}>{t('login.backToLogin')}</Text>
          </Link>
        </View>
      </View>
    </>
  );
}