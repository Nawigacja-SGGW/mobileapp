import { FontAwesome5 } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text } from 'react-native';

import { LanguageSwitch } from '~/components/LanguageSwitch';




export function DrawerMenu() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const menuOptions = [
    {
      label: t('menu.map'),
      icon: <FontAwesome5 name="map" size={20} color="black" />,
      onPress: () => {
        navigation.navigate('map-screen');
      },
    },
    {
      label: t('menu.objects'),
      icon: <FontAwesome5 name="box" size={20} color="black" />,
      onPress: () => {
        console.log('Open Objects');
      },
    },
    {
      label: t('menu.profile'),
      icon: <FontAwesome5 name="user" size={20} color="black" />,
      onPress: () => {
        console.log('Open Profile');
      },
    },
    {
      label: t('menu.settings'),
      icon: <FontAwesome5 name="cog" size={20} color="black" />,
      onPress: () => {
        console.log('Open Settings');
      },
    },

    {
      label: t('menu.object_example'),
      icon: <FontAwesome5 name="box" size={20} color="black" />,
      onPress: () => navigation.navigate('object_example')
    },




  ];

  const logoutOption = {
    label: t('menu.logout'),
    icon: <FontAwesome5 name="sign-out-alt" size={20} color="black" />,
    onPress: () => {
      console.log('Log out');
    },
  };

  return (
    <>
      <View className="h-full w-7/12">
        <View className="flex-1 px-4">
          <TouchableOpacity
            className="mt-10 w-20"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <FontAwesome5 name="angle-left" size={60} color="black" />
          </TouchableOpacity>
          <View className="my-auto">
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.onPress}
                className="mb-4 flex-row items-center p-4">
                {option.icon}
                <Text className="ml-2 text-black">{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={logoutOption.onPress}
            className="mb-10 mt-auto flex-row items-center p-4">
            {logoutOption.icon}
            <Text className="ml-2 text-black">{logoutOption.label}</Text>
          </TouchableOpacity>

          <View className="mb-4">
            <LanguageSwitch />
          </View>
        </View>
      </View>
    </>
  );
}


