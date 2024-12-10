import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';

import { useSettingsStore } from '~/store/useSettingsStore';

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  const onPressed = async () => {
    const newLanguage = i18n.language === 'pl' ? 'en' : 'pl';
    await i18n.changeLanguage(newLanguage);
    useSettingsStore.getState().setLanguage(newLanguage);
  };

  return (
    <View className="flex-row gap-2">
      <TouchableOpacity onPress={onPressed}>
        <Text
          className={`text-lg text-white ${
            i18n.language === 'pl' ? 'font-bold underline' : 'text-white'
          }`}>
          PL
        </Text>
      </TouchableOpacity>

      <Text className="text-lg text-gray-500">/</Text>

      <TouchableOpacity onPress={onPressed}>
        <Text
          className={`text-lg text-white ${
            i18n.language === 'en' ? 'font-bold underline' : 'text-white'
          }`}>
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
}
