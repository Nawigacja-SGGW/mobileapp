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
        className="p-5 bg-white"
        contentContainerStyle={{
          paddingTop: 32,
          paddingBottom: 32,
        }}>
        <Logo />

        <View className="mt-[20%]">
          <Text className="text-[24px] font-bold text-black mb-[10px]">{t('login.forgotPassword')}</Text>
          <Text className="text-[14px] font-light text-black mb-[10px]">{t('login.forgotPasswordText')}</Text>
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
            <Text className="text-[#003228] text-[14px] text-center font-bold">{t('login.backToLogin')}</Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}
