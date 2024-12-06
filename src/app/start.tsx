import { Link, useLocalSearchParams } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Image } from 'react-native';

import Background from '../../assets/background.svg';

import { AppButton } from '~/components/AppButton';
import { useObjectsStore } from '~/store/useObjectsStore';

export default function Start() {
  const { fetchData } = useObjectsStore();
  const params = useLocalSearchParams();

  React.useEffect(() => {
    console.log('Application start', params);
    fetchData();
  }, []);

  const { t } = useTranslation();
  const logoSize = 100;

  const styles = StyleSheet.create({
    background: {
      position: 'absolute', // SVG na całym tle
      top: 0,
      left: 0,
    },
    container: {
      flex: 1,
      backgroundColor: '#003228',
    },
    content: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
    },
    circle: {
      height: logoSize,
      width: logoSize,
      borderRadius: logoSize,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cccccc',
    },
  });

  return (
    <>
      <Drawer.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Background height="100%" width="100%" style={styles.background} className="absolute" />
        <View style={styles.content}>
          <View style={{ alignItems: 'center', marginBottom: '20%' }}>
            <Image source={require('./../../assets/nawigacja-SGGW.png')} style={styles.circle} />
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
