import { Link, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';
import { useUserStore } from '~/store/useUserStore';

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { loading, error, resetPasswordRequest } = useUserStore();

  const onSubmit = async (data: FieldValues) => {
    if (!data.email) {
      ToastAndroid.show('Wypełnij wszystkie pola', ToastAndroid.SHORT);
      return;
    }

    await resetPasswordRequest(data.email);

    if (!loading && !error) {
      ToastAndroid.show('Email wysłany pomyślnie', ToastAndroid.SHORT);
      navigation.navigate('confirmation');
    } else {
      ToastAndroid.show('Wystąpił błąd', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <Drawer.Screen options={{ headerShown: false }} />
      <ScrollView
        className="p-[20px] bg-white"
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
