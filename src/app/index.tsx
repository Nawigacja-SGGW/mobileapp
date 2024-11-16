import { useFocusEffect, useNavigation } from 'expo-router';

export default function Home() {
  const navigation = useNavigation();

  useFocusEffect(() => {
    console.log('go to start');
    navigation.navigate('start');
  });
}
