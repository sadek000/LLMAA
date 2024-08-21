import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { directionState } from "../state/atoms";
import "i18n";
import { useTranslation } from "react-i18next";

export const useHandleLanguageChange = () => {
  const setDirection = useSetRecoilState(directionState);
  const { i18n } = useTranslation();
  useEffect(() => {
    const changeDirection = (lng: string) => {
      const newDirection = lng === "ar" ? "rtl" : "ltr";
      setDirection(newDirection);
    };

    i18n.on("languageChanged", changeDirection);

    return () => {
      i18n.off("languageChanged", changeDirection);
    };
  }, [setDirection]);
};
