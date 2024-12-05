import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { fallbackChecker } from './fallbackChecker';
import { languageDetector } from './languageDetector';

import { useSettingsStore } from '~/store/useSettingsStore';

type Init18n = {
  resources: Resource;
  fallbackLng: string;
};

export const init18n = ({ resources, fallbackLng }: Init18n) => {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: fallbackChecker(resources, fallbackLng),
      compatibilityJSON: 'v3', // By default React Native projects does not support Intl
      interpolation: {
        escapeValue: false,
      },
    })
    .then(async () => {
      useSettingsStore.persist.onFinishHydration(async () => {
        const savedLanguage = await useSettingsStore.getState().language;
        console.log('savedLanguage', savedLanguage);
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
        }
      });
    });

  return i18n;
};
