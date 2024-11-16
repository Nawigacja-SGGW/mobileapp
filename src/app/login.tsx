import { Link, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import { Logo } from '~/components/Logo';

export default function Login() {
  const { control, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();
  const externalIconsSize = 44;
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (data: any) => {
    console.log(data); // logowanie danych formularza
    navigation.navigate('map-screen');
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
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
    bottom: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    circle: {
      height: externalIconsSize,
      width: externalIconsSize,
      borderRadius: externalIconsSize,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cccccc',
      marginHorizontal: 5,
    },
  });

  return (
    <>
      <Drawer.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          height: '100%',
          justifyContent: 'space-between',
          paddingTop: 32,
          paddingBottom: 32,
        }}>
        <Logo />

        <View>
          <Controller
            control={control}
            name="usernameOrEmail"
            render={({ field: { onChange, value } }) => (
              <AppInput
                label={t('login.usernameOrEmail.label')}
                placeholder={t('login.usernameOrEmail.placeholder')}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <AppSecureInput
                label={t('login.password.label')}
                placeholder={t('login.password.placeholder')}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            )}
          />
          <Link href={{ pathname: '/forgotPassword' }} asChild>
            <Text style={styles.boldedText}> {t('login.password.forgotPassword')}</Text>
          </Link>

          <AppButton title={t('login.signInButton')} onPress={handleSubmit(onSubmit)} />
        </View>
        <View>
          <Text style={styles.text}> {t('login.continueWith')}</Text>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.circle}>
              <Image source={require('./../../assets/google.png')} alt="Google logo" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circle}>
              <Image source={require('./../../assets/apple.png')} alt="Apple logo" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
