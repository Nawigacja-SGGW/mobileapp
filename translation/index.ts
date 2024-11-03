import en from './en.json';
import pl from './pl.json';
import { init18n } from '~/core/i18n/init';

export const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

export const fallbackLng = 'en';
export type LanguageCode = keyof typeof resources;

const i18n = init18n({ resources, fallbackLng });
export default i18n;