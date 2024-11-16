import React, { useState } from 'react';
import Drawer from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Logo } from '~/components/Logo';
import { AppButton } from '~/components/AppButton';
import { AppSecureInput } from '~/components/AppInput';

export default function ResetPassword() {

  const route = useRoute();
  const { email } = route.params || {};

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
      padding: 20,
      backgroundColor: '#fff',
    },
    content: {
      marginTop : '20%',
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
  });
  
  return (
    <>
      <Drawer.Screen options={{ headerShown: false, }}/>
      <ScrollView style={styles.container}>
        <Logo/>

        <View style={styles.content}>
          <Text style={styles.title}>{t('login.resetPassword')}</Text>
          <Text style={styles.text}>{t('login.resetPasswordText')+email}</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
              label= {t('login.newPassword.label')}
              placeholder= {t('login.newPassword.placeholder')}
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
              label= {t('login.confirmNewPassword.label')}
              placeholder= {t('login.confirmNewPassword.placeholder')}
              value={value}
              onChangeText={onChange}
              keyboardType="default"
              isPasswordVisible={isPassword2Visible}
              togglePasswordVisibility={togglePassword2Visibility}
              />
            )}
          />
          <AppButton title={t('login.resetButton')} onPress={handleSubmit(onSubmit)}/>
        </View>
      </ScrollView>
    </>
  );
}