import { useFocusEffect, useNavigation } from 'expo-router';
import { LogBox } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

import useLocationStore from '~/store/useLocationStore';
import { useObjectsStore } from '~/store/useObjectsStore';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useFocusEffect(() => {
    console.log('EXPO_PUBLIC_MODE', process.env.EXPO_PUBLIC_MODE);
    console.log('go to start');
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); // Ignore all log notifications

    useObjectsStore.subscribe((state) => {
      // Aktualizowanie listy lokalizacji na podstawie obiektów w useObjectsStore
      useLocationStore.setState({
        locations: [
          ...useObjectsStore.getState().areaObjects.map((n, i) => ({
            ...n,
            coordinates: [Number(n.longitude), Number(n.latitude)],
          })),
          ...useObjectsStore.getState().pointObjects.map((n, i) => ({
            ...n,
            coordinates: [Number(n.longitude), Number(n.latitude)],
          })),
        ],
      });
      //console.log('useLocationStore update', useLocationStore.getState());
    });

    navigation.navigate('start');
  });
}
