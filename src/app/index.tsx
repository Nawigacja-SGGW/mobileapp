import { useFocusEffect, useNavigation } from 'expo-router';
import { LogBox } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useFocusEffect(() => {
    console.log('EXPO_PUBLIC_MODE', process.env.EXPO_PUBLIC_MODE);
    console.log('go to start');
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); // Ignore all log notifications

    navigation.navigate('start');
  });
}
