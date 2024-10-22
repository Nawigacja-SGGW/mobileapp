import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, View } from 'react-native';

export function InternalizationExample() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = (locale: 'en' | 'fr') => {
    i18n.changeLanguage(locale);
  };
  return (
    <>
      <View className="gap-5">
        <Button title={t('button.french')} onPress={() => toggleLanguage('fr')} />
        <Button title={t('button.english')} onPress={() => toggleLanguage('en')} />
      </View>
    </>
  );
}
