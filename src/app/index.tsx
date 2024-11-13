import { useFocusEffect, useNavigation } from 'expo-router';
// import Drawer from 'expo-router/drawer';
import { Button} from 'react-native';

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
      <Button title="reset" onPress={ () => {navigation.navigate('resetPassword');}}/>
    </>
  );
}
