import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as en from './locale/en.json';
import * as pt from './locale/pt.json';

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
