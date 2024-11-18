import { Link, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Login() {
  const { control, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const circleStyleClass = "h-[44px] w-[44px] rounded-full justify-center items-center bg-[#cccccc] mx-1";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
            name="usernameOrEmail"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label={t('login.usernameOrEmail.label')}
                placeholder={t('login.usernameOrEmail.placeholder')}
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
          <Link href={{ pathname: '/forgotPassword' }} asChild>
            <Text className="text-[#003228] text-[12px] text-right underline mt-[10px] font-bold"> {t('login.password.forgotPassword')}</Text>
          </Link>
          <View style={{ marginTop: 16 }} />
          <AppButton title={t('login.signInButton')} onPress={handleSubmit(onSubmit)} />
        </View>
        <View>
          <Text className="text-[#003228] text-[13px] text-center font-medium"> {t('login.continueWith')}</Text>
          <View className="flex-row justify-center mt-[10px] mb-[20px]">
            <TouchableOpacity className={circleStyleClass}>
              <Image source={require('./../../assets/google.png')} alt="Google logo" />
            </TouchableOpacity>
            <TouchableOpacity className={circleStyleClass}>
              <Image source={require('./../../assets/apple.png')} alt="Apple logo" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
