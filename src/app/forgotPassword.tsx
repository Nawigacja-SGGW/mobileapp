import { Link, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onSubmit = (data: any) => {
    console.log(data); // logowanie danych formularza
    navigation.navigate('confirmation');
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
    },
    content: {
      marginTop: '20%',
    },
    title: {
      fontSize: 24,
      fontWeight: 700,
      color: '#000',
      marginBottom: 10,
    },
    text: {
      fontSize: 13,
      fontWeight: 300,
      color: '#000',
      marginBottom: 10,
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
      <Drawer.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: 32,
          paddingBottom: 32,
        }}>
        <Logo />

        <View style={styles.content}>
          <Text style={styles.title}>{t('login.forgotPassword')}</Text>
          <Text style={styles.text}>{t('login.forgotPasswordText')}</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label={t('login.email.label')}
                placeholder={t('login.email.placeholder')}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
              />
            )}
          />

          <View style={{ height: 32 }} />

          <AppButton title={t('login.sendButton')} onPress={handleSubmit(onSubmit)} />

          <Link href={{ pathname: '/login' }} asChild>
            <Text style={styles.bottomText}>{t('login.backToLogin')}</Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}
