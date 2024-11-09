import { Stack, Link } from 'expo-router';

import { ButtonApp } from '~/components/ButtonApp';
import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
          <Text style={styles.label}>Username or e-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
      
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
              <Image source={require("./../../assets/hide.png")} alt="Hide icon"/>
            </TouchableOpacity>
          </View>

          <Link href={{ pathname: '/details' }} asChild>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
          </Link>

        <Link href={{ pathname: '/login' }} asChild>
          <ButtonApp title="sign in" />
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
    fontWeight: 700,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 18,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 18,
  },
  forgotPassword: {
    color: '#003228',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 10,
    fontWeight: 700,
  },
});