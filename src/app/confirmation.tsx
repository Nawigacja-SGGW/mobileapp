import { useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { Logo } from '~/components/Logo';

export default function Confirmation() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    navigation.navigate('forgotPassword');
  };

  return (
    <>
      <Drawer.Screen options={{ headerShown: false }} />
      <ScrollView
        className="flex-1 p-[20px] bg-[#fff]"
        contentContainerStyle={{ height: '100%', paddingBottom: 32, paddingTop: 32 }}>
        <Logo />

        <View className="flex-1 justify-center items-center">
          <Text className="text-[20px] font-normal text-black mb-[10px]">{t('login.confirmation')}</Text>
          <Text className="text-[13px] font-light text-black mb-[10%]">{t('login.confirmationText')}</Text>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text className="text-[14px] font-bold text-[#003228] underline">{t('login.didntReceiveEmail')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
