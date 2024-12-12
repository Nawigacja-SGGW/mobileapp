import { useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, View, ToastAndroid } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';


import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import Loading from '~/components/Loading';
import { Logo } from '~/components/Logo';
import { useUserStore } from '~/store/useUserStore';

export default function Register() {
  const { control, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);
  const { loading, register } = useUserStore();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePassword2Visibility = () => {
    setIsPassword2Visible(!isPassword2Visible);
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data.email || !data.password || !data.confirmPassword) {
      ToastAndroid.show('Wypełnij wszystkie pola', ToastAndroid.SHORT);
      return;
    }
    try {
      await register(data.email, data.password);
      ToastAndroid.show('Zarejestrowano pomyślnie', ToastAndroid.SHORT);
      navigation.navigate('login');
    } catch {
      ToastAndroid.show('Wystąpił błąd', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      {loading && <Loading />}

      <Drawer.Screen options={{ headerShown: false }} />

      <ScrollView
        className="p-[20px] bg-white"
        contentContainerStyle={{
          height: '100%',
          justifyContent: 'space-between',
          paddingTop: 32,
          paddingBottom: 32,
        }}>
        <Logo />
        <View>
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
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
                label={t('login.password.label')}
                placeholder={t('login.password.placeholder')}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
                label={t('login.confirmPassword.label')}
                placeholder={t('login.confirmPassword.placeholder')}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                isPasswordVisible={isPassword2Visible}
                togglePasswordVisibility={togglePassword2Visibility}
              />
            )}
          />
        </View>

        <AppButton title={t('login.signUpButton')} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </>
  );
}
