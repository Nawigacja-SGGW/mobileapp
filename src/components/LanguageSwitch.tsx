import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';

import { useSettingsStore } from '~/store/useSettingsStore';

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  const onPressed = async (selectedLanguage) => {
    // check if language is selected
    if (i18n.language !== selectedLanguage) {
      await i18n.changeLanguage(selectedLanguage);
      useSettingsStore.getState().setLanguage(selectedLanguage);
    }
  };

  return (
    <View className="flex-row gap-2">
      <TouchableOpacity onPress={() => onPressed('pl')}>
        <Text
          className={`text-lg ${
            i18n.language === 'pl' ? 'font-bold underline text-white' : 'text-gray-500'
          }`}>
          PL
        </Text>
      </TouchableOpacity>

      <Text className="text-lg text-gray-500">/</Text>

      <TouchableOpacity onPress={() => onPressed('en')}>
        <Text
          className={`text-lg ${
            i18n.language === 'en' ? 'font-bold underline text-white' : 'text-gray-500'
          }`}>
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
}
