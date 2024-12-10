import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';


import { AppButton } from '~/components/AppButton';
import { AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function ResetPassword() {
  const route = useRoute();
  const { email } = route.params || {};

  const { control, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePassword2Visibility = () => {
    setIsPassword2Visible(!isPassword2Visible);
  };

  const onSubmit = (data: any) => {
    console.log(data); // logowanie danych formularza
    navigation.navigate('login');
  };
  
  return (
    <>
      <Drawer.Screen options={{ headerShown: false, }}/>
      <ScrollView className="p-[20px] bg-white">
        <Logo/>

        <View className="mt-[20%]">
          <Text className="text-[24px] font-bold text-black mb-[10px]">{t('login.resetPassword')}</Text>
          <Text className="text-[14px] font-light text-black mb-[10px]">{t('login.resetPasswordText')+email}</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
                label={t('login.newPassword.label')}
                placeholder={t('login.newPassword.placeholder')}
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
                label={t('login.confirmNewPassword.label')}
                placeholder={t('login.confirmNewPassword.placeholder')}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                isPasswordVisible={isPassword2Visible}
                togglePasswordVisibility={togglePassword2Visibility}
              />
            )}
          />
          <AppButton title={t('login.resetButton')} onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </>
  );
}
