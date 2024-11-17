import React from 'react';
import Drawer from 'expo-router/drawer';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text, Image } from 'react-native';

import { AppButton } from '~/components/AppButton';
import Background from '../../assets/background.svg';

export default function Start() {
  const { t } = useTranslation();

  return (
    <>
      <Drawer.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-[#003228]">
        <Background height="100%" width="100%" style={{position: 'absolute', top: 0, left: 0}} />
        <View className="flex-1 justify-center p-[20px]">
          <View style={{ alignItems: 'center', marginBottom: '20%' }}>
          <Image source={require('./../../assets/icon.png')} className="h-[100px] w-[100px] rounded-full bg-[#cccccc] justify-center items-center" />
          </View>
          <Link href={{ pathname: '/register' }} asChild>
            <AppButton title={t('login.signUpButton')} buttonStyle="!bg-black my-4" />
          </Link>
          <Link href={{ pathname: '/login' }} asChild>
            <AppButton
              title={t('login.signInButton')}
              buttonStyle="!bg-white my-4"
              textStyle="!text-black"
            />
          </Link>
        </View>
      </View>
    </>
  );
}


