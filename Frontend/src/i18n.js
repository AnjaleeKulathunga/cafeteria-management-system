import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json'; // Import English translations
import si from './locales/si.json'; // Import Sinhala translations

i18n
  .use(initReactI18next) // Use react-i18next
  .init({
    resources: {
      en: { translation: en },
      si: { translation: si }
    },
    lng: 'en',  // Default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false,  // React already escapes values
    },
  });

export default i18n;