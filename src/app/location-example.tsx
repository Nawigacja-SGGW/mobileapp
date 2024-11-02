import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { Container } from '~/components/Container';

export default function LocationExample() {
  const [location, setLocation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify(location));
    })();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Location' }} />
      <Container>
        <Text>Permission status: {errorMsg ?? 'granted'}</Text>
        <Text>Your location: {location}</Text>
      </Container>
    </>
  );
}
