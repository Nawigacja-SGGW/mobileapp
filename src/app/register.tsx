import React, { useState } from 'react';
import Drawer from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import {View, StyleSheet, ScrollView} from 'react-native';

import { Logo } from '~/components/Logo';
import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';

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
    boldedText: {
      color: '#003228',
      fontSize: 12,
      textAlign: 'right',
      textDecorationLine: 'underline',
      marginTop: 10,
      fontWeight: 700,
    },
    text: {
      color: '#003228',
      fontSize: 13,
      textAlign: 'center',
      fontWeight: 500,
    },
  });
  
  return (
    <>
      <Drawer.Screen options={{ headerShown: false, }}/>
      <ScrollView style={styles.container}>
        <Logo/>

        <View style={styles.content}>
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
          
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <AppInput
              label = {t('login.username.label')}
              placeholder = {t('login.username.placeholder')}
              value={value}
              onChangeText={onChange}
              keyboardType="default" 
              />
            )}
          />
          
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
              label= {t('login.password.label')}
              placeholder= {t('login.password.placeholder')}
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
            name="email"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
              label= {t('login.confirmPassword.label')}
              placeholder= {t('login.confirmPassword.placeholder')}
              value={value}
              onChangeText={onChange}
              keyboardType="default"
              isPasswordVisible={isPassword2Visible}
              togglePasswordVisibility={togglePassword2Visibility}
              />
            )}
          />

          <AppButton title={t('login.signUpButton')} onPress={handleSubmit(onSubmit)}/>
        </View>
      </ScrollView>
    </>
  );
}