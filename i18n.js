// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import hy from './locales/hy.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      hy: { translation: hy },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: 'en', // default լեզուն
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
