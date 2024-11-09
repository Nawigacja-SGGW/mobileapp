import { Stack, Link } from 'expo-router';

import { AppButton } from '~/components/AppButton';
import { AppInput, AppSecureInput } from '~/components/AppInput';
import React, { useState } from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
        <View style={styles.container}>
          <AppInput
            label="Username or e-mail"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" 
            />

          <AppSecureInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            />

          <Link href={{ pathname: '/details' }} asChild>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
          </Link>

          <Link href={{ pathname: '/login' }} asChild>
            <AppButton title="sign in" />
          </Link>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    color: '#003228',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 10,
    fontWeight: 700,
  },
});