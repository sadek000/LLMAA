import { useTranslation } from "react-i18next";

export const useATTranslation = (keys: string[]) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  function letterSpacingForArabic(word: string) {
    let result = "";
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      result += letter;
      if (
        letter === "ا" ||
        letter === "ء" ||
        letter === "أ" ||
        letter === "آ" ||
        letter === "إ" ||
        letter === "ؤ" ||
        letter === "ى" ||
        letter === "ة" ||
        letter === "د" ||
        letter === "ذ" ||
        letter === "ر" ||
        letter === "ز" ||
        letter === "و" ||
        (letter === "ل" && word[i + 1] === "ا") ||
        (letter === "ل" && word[i + 1] === "أ") ||
        (letter === "ل" && word[i + 1] === "آ") ||
        (letter === "ل" && word[i + 1] === "إ") ||
        letter === " " ||
        word[i + 1] === " " ||
        i === word.length - 1
      ) {
        //Don't add connection letter
      } else {
        //Add connection letter
        result += "ـ";
      }
    }
    return result;
  }

  return keys.map((key) => {
    if (language === "AR") return letterSpacingForArabic(t(key));
    else return t(key);
  });
};
