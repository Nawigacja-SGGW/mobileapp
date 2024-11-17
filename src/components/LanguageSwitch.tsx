import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  return (
    <View className="flex-row gap-2">
      <TouchableOpacity onPress={() => i18n.changeLanguage('pl')}>
        <Text
          className={`text-lg text-white ${
            i18n.language === 'pl' ? 'font-bold underline' : 'text-white'
          }`}>
          PL
        </Text>
      </TouchableOpacity>

      <Text className="text-lg text-gray-500">/</Text>

      <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
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
