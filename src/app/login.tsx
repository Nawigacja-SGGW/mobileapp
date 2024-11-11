import { Stack, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();
  const externalIconsSize = 44;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
    bottom:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop:10,
      marginBottom:20,
    },
    circle:{
      height : externalIconsSize,
      width : externalIconsSize,
      borderRadius: externalIconsSize,
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#cccccc',
      marginHorizontal:5,
    },
  });
  
  return (
    <>
      <Stack.Screen options={{ title: t('login.screenTitle') }} />
      <View style={styles.container}>
        <Logo/>

        <View style={styles.content}>
          <AppInput
            label = {t('login.usernameOrEmail.label')}
            placeholder = {t('login.usernameOrEmail.placeholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" 
            />

          <AppSecureInput
            label= {t('login.password.label')}
            placeholder= {t('login.password.placeholder')}
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            />

          <Link href={{ pathname: '/login' }} asChild>
            <Text style={styles.boldedText}> {t('login.password.forgotText')}</Text>
          </Link>

          <Link href={{ pathname: '/login' }} asChild>
            <AppButton title="sign in" />
          </Link>
        </View>
        <Text style={styles.text}> {t('login.continueWith')}</Text>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.circle}>
            <Image source={require("./../../assets/google.png")} alt="Hide icon"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.circle}>
            <Image source={require("./../../assets/apple.png")} alt="Hide icon"/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}