import { Stack, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import React from 'react';
import {View, StyleSheet, Text } from 'react-native';

import { AppButton } from '~/components/AppButton';
import Background from '../../assets/background.svg';

export default function Login() {

  const { t } = useTranslation();
  const logoSize = 70;

  const styles = StyleSheet.create({
    background: {
      position: 'absolute', // SVG na całym tle
      top: 0,
      left: 0,

    },
    container: {
      flex: 1,
      backgroundColor:"#003228",
    },
    content: {
      padding:20,
      flex: 1,
      justifyContent: 'center',
    },
    circle:{
      height : logoSize,
      width : logoSize,
      borderRadius: logoSize,
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#cccccc',
    },
  });
  
  return (
    <>
      <Stack.Screen options={{ title: t('login.screenTitle') }} />
      <View style={styles.container}>
        <Background style={styles.background}/>
        <View style={styles.content}>
          <View style={{alignItems: "center",marginBottom:"20%",}}>
            <View style={styles.circle}>
              <Text>Logo</Text> 
            </View>
          </View>
             <Link href={{ pathname: '/register' }} asChild>
              <AppButton title={t('login.signUpButton')} buttonStyle={{backgroundColor: '#000',marginVertical:15}}/>
            </Link>

            <Link href={{ pathname: '/login' }} asChild>
              <AppButton title={t('login.signInButton')} buttonStyle={{backgroundColor: '#fff',marginVertical:15}} textStyle={{color: '#000'}}/>
            </Link>
        </View>
      </View>
    </>
  );
}