import { EvilIcons, Feather, FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
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
      icon: <Ionicons name="location-outline" size={32} color="white" />,
      onPress: () => {
        navigation.navigate('map-screen');
      },
    },
    {
      label: t('menu.objects'),
      icon: <FontAwesome5 name="building" size={32} color="white" />,
      onPress: () => {
        console.log('Open Objects');
      },
    },
    {
      label: t('menu.profile'),
      icon: <FontAwesome5 name="user" size={32} color="white" />,
      onPress: () => {
        console.log('Open Profile');
      },
    },
    {
      label: t('menu.settings'),
      icon: <Feather name="settings" size={32} color="white" />,
      onPress: () => {
        console.log('Open Settings');
      },
    },
  ];

  const logoutOption = {
    label: t('menu.logout'),
    icon: <SimpleLineIcons name="logout" size={32} color="white" />,
    onPress: () => {
      navigation.navigate('index');
    },
  };

  return (
    <>
      <View className="h-full p-4">
        <View className="mt-10 h-20 flex-row items-center">
          <TouchableOpacity
            className="w-20"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <FontAwesome5 name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
          <Text className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-white">
            Nawigacja SGGW
          </Text>
        </View>
        <View className="flex-1 justify-center">
          {menuOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.onPress}
              className="mb-4 flex-row items-center pb-4">
              {option.icon}
              <Text className="ml-6 text-xl font-medium text-white">{option.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={logoutOption.onPress}
            className="mt-32 flex-row items-center pb-4">
            {logoutOption.icon}
            <Text className="ml-6 text-xl font-medium text-white">{logoutOption.label}</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <LanguageSwitch />
        </View>
      </View>
    </>
  );
}
