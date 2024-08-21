import { useRecoilState } from "recoil";
import {
  miniSidenavState,
  darkModeState,
  transparentSidenavState,
  whiteSidenavState,
  sidenavColorState,
  transparentNavbarState,
  fixedNavbarState,
  directionState,
  layoutState,
  SideNavColor,
} from "./atoms";
export const useToggleMiniSidenav = (): [boolean, () => void] => {
  const [miniSidenav, setMiniSidenav] = useRecoilState(miniSidenavState);

  const toggle = () => setMiniSidenav(!miniSidenav);

  return [miniSidenav, toggle];
};

export const useTransparentSidenav = (): [boolean, (value: boolean) => void] => {
  return useRecoilState(transparentSidenavState);
};

export const useWhiteSidenav = (): [boolean, (value: boolean) => void] => {
  return useRecoilState(whiteSidenavState);
};

export const useSidenavColor = (): [SideNavColor, (value: SideNavColor) => void] => {
  return useRecoilState(sidenavColorState);
};

export const useTransparentNavbar = (): [boolean, (value: boolean) => void] => {
  return useRecoilState(transparentNavbarState);
};

export const useFixedNavbar = (): [boolean, (value: boolean) => void] => {
  return useRecoilState(fixedNavbarState);
};

export const useDirection = (): ["ltr" | "rtl", (value: "ltr" | "rtl") => void] => {
  return useRecoilState(directionState);
};

export const useLayout = (): ["dashboard" | "page", (value: "dashboard" | "page") => void] => {
  return useRecoilState(layoutState);
};

export const useDarkMode = (): [boolean, (value: boolean) => void] => {
  return useRecoilState(darkModeState);
};
