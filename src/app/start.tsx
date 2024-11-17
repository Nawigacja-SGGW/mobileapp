import React from 'react';
import Drawer from 'expo-router/drawer';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Image } from 'react-native';

import { AppButton } from '~/components/AppButton';
import Background from '../../assets/background.svg';

export default function Start() {
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
        <Background height="100%" width="100%" style={styles.background} />
        <View style={styles.content}>
          <View style={{ alignItems: 'center', marginBottom: '20%' }}>
            <Image source={require('./../../assets/logo-nsggw.png')} style={styles.circle} />
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

