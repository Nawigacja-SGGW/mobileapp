import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import TopHeader from '~/components/TopHeader';

import { LogBox } from 'react-native';

export default function Home() {
  const navigation = useNavigation();

  useFocusEffect(() => {
    console.log('go to start');
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); // Ignore all log notifications

    navigation.navigate({ name: 'start' });
  });
}
