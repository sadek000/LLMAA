import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface CookieOptions {
  path?: string;
  expires?: number | Date;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

interface UseCookieManager {
  getToken: () => string | undefined;
  setToken: (token: string, options?: CookieOptions) => void;
  getLanguage: () => string | undefined;
  setLanguage: (language: string, options?: CookieOptions) => void;
  getTheme: () => string | undefined;
  setTheme: (theme: string, options?: CookieOptions) => void;
  getDirection: () => string | undefined;
  setDirection: (direction: string, options?: CookieOptions) => void;
}

export const useCookieManager = (): UseCookieManager => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      // This is a placeholder for any initialization logic you might need.
      // For example, you might want to read the cookies and set some state in your app based on their values.
      setInitialized(true);
    }
  }, [initialized]);

  const getToken = (): string | undefined => {
    return Cookies.get("token");
  };

  const setToken = (token: string, options?: CookieOptions): void => {
    Cookies.set("token", token, options);
  };

  const getLanguage = (): string | undefined => {
    return Cookies.get("lang");
  };

  const setLanguage = (language: string, options?: CookieOptions): void => {
    Cookies.set("lang", language, options);
  };

  const getTheme = (): string | undefined => {
    return Cookies.get("theme");
  };

  const setTheme = (theme: string, options?: CookieOptions): void => {
    Cookies.set("theme", theme, options);
  };

  const getDirection = (): string | undefined => {
    return Cookies.get("dir");
  };

  const setDirection = (direction: string, options?: CookieOptions): void => {
    Cookies.set("dir", direction, options);
  };

  return {
    getToken,
    setToken,
    getLanguage,
    setLanguage,
    getTheme,
    setTheme,
    getDirection,
    setDirection,
  };
};
