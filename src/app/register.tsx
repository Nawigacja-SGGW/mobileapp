import { useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Register() {
  const { control, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePassword2Visibility = () => {
    setIsPassword2Visible(!isPassword2Visible);
  };

  const onSubmit = (data: any) => {
    console.log(data); // logowanie danych formularza
    navigation.navigate('map-screen');
  };

  return (
    <>
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
            name="username"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label={t('login.username.label')}
                placeholder={t('login.username.placeholder')}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
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
