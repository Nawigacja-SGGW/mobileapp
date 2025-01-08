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
      ToastAndroid.show(t('login.fillAllFields'), ToastAndroid.SHORT);
      return;
    }
    try {
      await resetPasswordRequest(data.email);
      ToastAndroid.show(t('login.emailSentSuccessfully'), ToastAndroid.SHORT);
      navigation.navigate('confirmation');
    } catch {
      ToastAndroid.show(t('login.errorOccurred'), ToastAndroid.SHORT);
    }
  };

  return (
    <>
      {loading && <Loading />}

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
