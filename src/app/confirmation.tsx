import React from 'react';
import Drawer from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { Logo } from '~/components/Logo';

export default function Confirmation() {

  const { t } = useTranslation();
  const navigation = useNavigation();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    navigation.navigate('index')
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
    },
    title:{
      fontSize: 20,
      fontWeight: 400,
      color: '#000',
      marginBottom:10,
    },
    text: {
      fontSize: 13,
      fontWeight: 300,
      color: '#000',
      marginBottom: '10%',
    },
    bottomText: {
      color: '#003228',
      textDecorationLine: 'underline',
      fontSize: 14,
      fontWeight: 700,
    },
  });
  
  return (
    <>
      <Drawer.Screen options={{ headerShown: false, }}/>
      <View style={styles.container}>
        <Logo/>

        <View style={styles.content}>
          <Text style={styles.title}>{t('login.confirmation')}</Text>
          <Text style={styles.text}>{t('login.confirmationText')}</Text>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.bottomText}>{t('login.didntReceiveEmail')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}