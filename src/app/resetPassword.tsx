import React, { useState } from 'react';
import Drawer from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Logo } from '~/components/Logo';
import { AppButton } from '~/components/AppButton';
import { AppSecureInput } from '~/components/AppInput';

export default function ResetPassword() {

  const route = useRoute();
  const { email } = route.params || {};

  const { handleSubmit } = useForm();
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password2, setPassword2] = useState('');
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

          <AppSecureInput
            label= {t('login.newPassword.label')}
            placeholder= {t('login.newPassword.placeholder')}
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            />

          <AppSecureInput
            label= {t('login.confirmNewPassword.label')}
            placeholder= {t('login.confirmNewPassword.placeholder')}
            value={password2}
            onChangeText={setPassword2}
            keyboardType="default"
            isPasswordVisible={isPassword2Visible}
            togglePasswordVisibility={togglePassword2Visibility}
            />

          <AppButton title={t('login.resetButton')} onPress={handleSubmit(onSubmit)}/>
        </View>
      </ScrollView>
    </>
  );
}