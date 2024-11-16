import { useFocusEffect, useNavigation } from 'expo-router';
// import Drawer from 'expo-router/drawer';
import { Button} from 'react-native';
import React from 'react';

export default function Home() {
  const navigation = useNavigation();

  // useFocusEffect(() => {
  //   console.log('go to mpa-screen');
  //   navigation.navigate('map-screen');
  // });
  return (
    <>
      <Button title="default" onPress={ () => {navigation.navigate('start');}}/>
      <Button title="sign in" onPress={ () => {navigation.navigate('login');}}/>
      <Button title="sign up" onPress={ () => {navigation.navigate('register');}}/>
      <Button title="forgot" onPress={ () => {navigation.navigate('forgotPassword');}}/>
      <Button title="reset" onPress={ () => {navigation.navigate('resetPassword', { email: 'user@example.com' });}}/>
      <Button title="confirmation" onPress={ () => {navigation.navigate('confirmation');}}/>
      <Button title="map" onPress={ () => {navigation.navigate('map-screen');}}/>
    </>
  );
}
