import { Feather, FontAwesome5, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text, ToastAndroid } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

import Loading from './Loading';
import RankingIcon from '../../assets/leaderboard.svg';
import StatisticsIcon from '../../assets/trending-up.svg';

import { LanguageSwitch } from '~/components/LanguageSwitch';
import { useUserStore } from '~/store/useUserStore';
import useLocationStore from '~/store/useLocationStore';

export function DrawerMenu() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { logout, loading, error } = useUserStore();
  const { previewGuide: startCampusGuide, navigationMode, isGuideActive } = useLocationStore();

  const menuOptions = [
    {
      label: t('menu.map'),
      icon: <Entypo name="map" size={32} color="white" />,
      onPress: () => {
        navigation.navigate('map-screen');
      },
    },
    {
      label: t('menu.objects'),
      icon: <Feather name="map-pin" size={32} color="white" />,
      onPress: () => {
        navigation.navigate('objects');
      },
    },
    {
      label: t('menu.profile'),
      icon: <FontAwesome5 name="user" size={32} color="white" />,
      onPress: () => {
        navigation.navigate('profileView');
      },
    },
    {
      label: t('menu.guide'),
      icon: <FontAwesome5 name="flag" size={32} color="white" />,
      onPress: () => {
        navigation.navigate('map-screen');
        startCampusGuide();
        console.log('open campus guide', navigationMode, isGuideActive);
      },
    },
    {
      label: t('menu.timetable'),
      icon: <Feather name="clock" size={32} color="white" />,
      onPress: () => {
        navigation.navigate('timetableView');
      },
    },
    {
      label: t('menu.settings'),
      icon: <Feather name="settings" size={32} color="white" />,
      onPress: () => {
        navigation.navigate('settingsView');
      },
    },
  ];

  const logoutOption = {
    label: t('menu.logout'),
    icon: <MaterialIcons name="logout" size={32} color="white" />,
    onPress: async () => {
      try {
        await logout();
      } catch {
        ToastAndroid.show('Nie udało się wylogować', ToastAndroid.SHORT);
      }
      if (!loading && !error) {
        navigation.navigate('index');
      } else {
        ToastAndroid.show('Nie udało się wylogować', ToastAndroid.SHORT);
      }
    },
  };

  return (
    <>
      {loading && <Loading />}

      <View className="h-full p-4">
        <View className="mt-10 h-20 flex-row items-center">
          <TouchableOpacity
            className="w-20"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <AntDesign name="arrowleft" size={32} color="white" />
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

        <View className="mb-4 flex-row justify-between">
          <LanguageSwitch />
          <View className="flex-row gap-6">
            <StatisticsButton />
            <RankingButton />
          </View>
        </View>
      </View>
    </>
  );
}

function RankingButton() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('rankingView')}>
        <RankingIcon width={32} height={32} fill="white" />
      </TouchableOpacity>
    </>
  );
}

function StatisticsButton() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('statisticsView')}>
        <StatisticsIcon width={32} height={32} fill="white" />
      </TouchableOpacity>
    </>
  );
}
