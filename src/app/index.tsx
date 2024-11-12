import { useFocusEffect, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';

export default function Home() {
  const navigation = useNavigation();

  useFocusEffect(() => {
    console.log('go to mpa-screen');
    navigation.navigate('map-screen');
  });

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />
    </>
  );
}
