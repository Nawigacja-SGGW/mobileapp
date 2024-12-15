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

const routeOptions = [
  { label: 'settings.walk', value: RoutePreference.Walk },
  { label: 'settings.bike', value: RoutePreference.Bike },
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
            className={`flex-row items-center justify-between border-b border-gray-200 px-6 py-4 ${
              routePreference === item.value ? 'bg-gray-200 font-bold' : ''
            }`}>
            <Text
              className={`text-lg ${routePreference === item.value ? 'text-black' : 'text-gray-800'}`}>
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
