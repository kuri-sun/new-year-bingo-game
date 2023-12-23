import i18n from "i18next";
import { initReactI18next } from "../../../node_modules/react-i18next";
import translations from "./translation";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector/cjs";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    // lng: "ja", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
