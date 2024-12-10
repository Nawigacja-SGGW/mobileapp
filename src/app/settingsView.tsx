import { router } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native';

import ArrowIcon from '../../assets/arrow.svg';
import ChangePassIcon from '../../assets/changepass.svg';
import LanguageIcon from '../../assets/language.svg';

import TopHeader from '~/components/TopHeader';

export default function SettingsView() {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const settingsOptions = [
    {
      label: t('settings.language'),
      icon: <LanguageIcon width={28} height={28} fill="white" />,
      onPress: () => router.push('/changeLanguageView'),
    },
    {
      label: t('settings.changePassword'),
      icon: <ChangePassIcon width={28} height={28} fill="white" />,
      onPress: () => router.push('/changePasswordView'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#003228] px-6">
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <TopHeader onlyBack modeSearch="" toggleSearchBar={() => {}} />,
        }}
      />

      <View style={{ marginTop: height * 0.2 }}>
        <Text className="text-2xl font-bold text-white">{t('menu.settings')}</Text>
      </View>

      <View style={{ marginTop: height * 0.1 }}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={option.onPress}
            style={{
              marginBottom: height * 0.04,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {option.icon}
              <Text className="ml-4 text-lg font-medium text-white">{option.label}</Text>
            </View>
            <ArrowIcon width={20} height={20} fill="white" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
