import { Link, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

import { AppButton } from '~/components/AppButton';
import { AppInput } from '~/components/AppInput';
import Loading from '~/components/Loading';
import { Logo } from '~/components/Logo';
import { useUserStore } from '~/store/useUserStore';

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { loading, resetPasswordRequest } = useUserStore();

  const onSubmit = async (data: FieldValues) => {
    if (!data.email) {
      ToastAndroid.show('Wypełnij wszystkie pola', ToastAndroid.SHORT);
      return;
    }
    try {
      await resetPasswordRequest(data.email);
      ToastAndroid.show('Email wysłany pomyślnie', ToastAndroid.SHORT);
      navigation.navigate('confirmation');
    } catch {
      ToastAndroid.show('Wystąpił błąd', ToastAndroid.SHORT);
    }
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
      {loading && <Loading />}

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
