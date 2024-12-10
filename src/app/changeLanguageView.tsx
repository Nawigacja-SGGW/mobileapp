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
import { useSettingsStore } from '~/store/useSettingsStore';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Polski', value: 'pl' },
];

export default function ChangeLanguageView() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { height, width } = useWindowDimensions();

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
        <Text className="text-2xl font-bold text-black">{t('settings.language')}</Text>
      </View>

      {/* Lista języków */}
      <FlatList
        data={languages}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => i18n.changeLanguage(item.value)}
            className={`flex-row items-center justify-between border-b border-gray-200 px-6 py-4 ${
              i18n.language === item.value ? 'bg-gray-200 font-bold' : ''
            }`}>
            <Text
              className={`text-lg ${i18n.language === item.value ? 'text-black' : 'text-gray-800'}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
      />

      {/* Przycisk zapisz */}
      <TouchableOpacity
        onPress={() => {
          useSettingsStore.getState().setLanguage(i18n.language);
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
