import { Stack, Link, Redirect, useRouter, useFocusEffect, useNavigation } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { TopPanel } from '~/app/TopPanel';
import { SlidingMenu } from '~/app/menu';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const { t } = useTranslation();

  // if (true) {
  //   return <Redirect href="/map-screen" />;
  // }
  const router = useRouter();
  const navigation = useNavigation();

  useFocusEffect(() => {
    console.log('go to mpa-screen');
    navigation.navigate('map-screen', {});
  });

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
      />

      <Link href="/" className="mt-4 pt-4">
        <Text>Home</Text>
      </Link>
      <Link href="/" className="mt-4 pt-4">
        <Text>Home</Text>
      </Link>
      <Link href="/map-screen" className="mt-4 pt-4">
        <Text>Home</Text>
      </Link>
      <Button onPress={() => router.replace('/map-screen')}>Go to Map</Button>
    </>
  );
}
