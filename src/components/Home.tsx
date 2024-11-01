import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';

export function Home() {
  const { i18n } = useTranslation();

  return (
    <View className="flex-row gap-2">
      <TouchableOpacity onPress={() => i18n.changeLanguage('pl')}>
        <Text 
          className={`text-lg ${
            i18n.language === 'pl' ? 'text-indigo-500 font-bold' : 'text-gray-500'
          }`}
        >
          PL
        </Text>
      </TouchableOpacity>
      
      <Text className="text-lg text-gray-500">/</Text>
      
      <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
        <Text 
          className={`text-lg ${
            i18n.language === 'en' ? 'text-indigo-500 font-bold' : 'text-gray-500'
          }`}
        >
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
}