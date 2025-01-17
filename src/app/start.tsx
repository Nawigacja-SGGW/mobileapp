import { Link, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

import Background from '../../assets/background.svg';

import { AppButton } from '~/components/AppButton';
import { useObjectsStore } from '~/store/useObjectsStore';
import { useUserStore } from '~/store/useUserStore';

export default function Start() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const params = useLocalSearchParams();
  const { fetchData } = useObjectsStore();
  const { token } = useUserStore();

  React.useEffect(() => {
    console.log('Application start', params);
  }, []);

  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      fetchData();

      if (token !== null) {
        navigation.navigate('map-screen');
      }
    }, [])
  );

  return (
    <>
      <Drawer.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-[#003228]">
        <Background height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0 }} />
        <View className="flex-1 justify-center p-[20px]">
          <View style={{ alignItems: 'center', marginBottom: '20%' }}>
            <Image
              source={require('./../../assets/nawigacja-SGGW.png')}
              className="h-[100px] w-[100px] items-center justify-center rounded-full bg-[#cccccc]"
            />
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
