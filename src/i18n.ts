// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define a type for your resources
interface Resources {
  [language: string]: {
    translation: {
      [key: string]: string;
    };
  };
}

const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANGUAGES.split(",");

// Create resources with the appropriate type
const resources: Resources = supportedLanguages.reduce((acc, lang) => {
  acc[lang.toLowerCase()] = {
    translation: require(`./locales/${lang.toLowerCase()}/translation.json`),
  };
  return acc;
}, {} as Resources); // Cast the initial value of reduce to Resources

i18n.use(initReactI18next).init({
  resources,
  lng: supportedLanguages[1].toLowerCase(),
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
