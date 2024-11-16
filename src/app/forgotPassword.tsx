import React from 'react';
import Drawer from 'expo-router/drawer';
import { Link, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import { Logo } from '~/components/Logo';
import { AppButton } from '~/components/AppButton';
import { AppInput } from '~/components/AppInput';

export default function ForgotPassword() {

  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onSubmit = (data:any) => {
    console.log(data); // logowanie danych formularza
    navigation.navigate('index')
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: 20,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    title:{
      fontSize: 24,
      fontWeight: 700,
      color: '#000',
      marginBottom:10,
    },
    text: {
      fontSize: 13,
      fontWeight: 300,
      color: '#000',
      marginBottom:10,
    },
    bottomText: {
      color: '#003228',
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 700,
    },
  });
  
  return (
    <>
      <Drawer.Screen options={{ headerShown: false, }}/>
      <ScrollView style={styles.container}>
        <Logo/>
        <View style={styles.content}>
          <Text style={styles.title}>{t('login.forgotPassword')}</Text>
          <Text style={styles.text}>{t('login.forgotPasswordText')}</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <AppInput
              label = {t('login.email.label')}
              placeholder = {t('login.email.placeholder')}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address" 
              />
            )}
          />

          <AppButton title={t('login.sendButton')} onPress={handleSubmit(onSubmit)}/>

          <Link href={{ pathname: '/login' }} asChild>
            <Text style={styles.bottomText}>{t('login.backToLogin')}</Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}