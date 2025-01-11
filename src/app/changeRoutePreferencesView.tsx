import Drawer from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';

import TopHeader from '~/components/TopHeader';
import { RoutePreference, useSettingsStore } from '~/store/useSettingsStore';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const routeOptions = [
  { label: 'settings.walk', value: RoutePreference.Walk, ikon: <FontAwesome5  name="walking" size={24} color="black" /> },
  { label: 'settings.bike', value: RoutePreference.Bike, ikon: <MaterialIcons name="directions-bike" size={24} color="black" /> },
];

export default function ChangeLanguageView() {
  const { t } = useTranslation();
  const { height, width } = useWindowDimensions();
  const { routePreference, setRoutePreference } = useSettingsStore();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch="" toggleSearchBar={() => {}} />,
        }}
      />

      {/* Tytuł */}
      <View
        style={{
          marginTop: height * 0.2,
          marginBottom: height * 0.05,
        }}>
        <Text className="text-2xl font-bold text-black">{t('settings.routePreferences')}</Text>
      </View>

      {/* Lista języków */}
      <FlatList
        data={routeOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setRoutePreference(item.value)}
            className={`flex-row items-center space-x-4 border-b border-gray-200 px-6 py-4 ${
              routePreference === item.value ? 'bg-gray-200' : ''
            }`}>
            <View className="mr-4">{item.ikon}</View>
            <Text
              className={`text-lg ${routePreference === item.value ? 'text-black font-bold' : 'text-gray-800'}`}>
              {t(item.label)}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
      />

      {/* Przycisk zapisz */}
      <TouchableOpacity
        onPress={() => {
          useSettingsStore
            .getState()
            .setRoutePreference(useSettingsStore.getState().routePreference);
          ToastAndroid.show(t('settings.saved'), ToastAndroid.SHORT);
        }}
        className="mt-8 h-14 items-center justify-center rounded-full bg-[#004D40]"
        style={{
          width: width > 400 ? '80%' : '100%',
          alignSelf: 'center',
        }}>
        <Text className="text-base font-bold text-white">{t('settings.save')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
