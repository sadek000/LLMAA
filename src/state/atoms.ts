import { atom } from "recoil";

export type SideNavColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "dark";

const defaultLanguage = (
  process.env.REACT_APP_SUPPORTED_LANGUAGES?.split(",")[0] || "EN"
).toLowerCase();

export const miniSidenavState = atom<boolean>({
  key: "miniSidenavState",
  default: process.env.REACT_APP_MINI_SIDENAV === "true",
});

export const transparentSidenavState = atom<boolean>({
  key: "transparentSidenavState",
  default: process.env.REACT_APP_TRANSPARENT_SIDENAV === "true",
});

export const whiteSidenavState = atom<boolean>({
  key: "whiteSidenavState",
  default: process.env.REACT_APP_WHITE_SIDENAV === "true",
});

export const sidenavColorState = atom<SideNavColor>({
  key: "sidenavColorState",
  default: (process.env.REACT_APP_SIDENAV_COLOR as SideNavColor) || "primary",
});

export const transparentNavbarState = atom<boolean>({
  key: "transparentNavbarState",
  default: process.env.REACT_APP_TRANSPARENT_NAVBAR === "true",
});

export const fixedNavbarState = atom<boolean>({
  key: "fixedNavbarState",
  default: process.env.REACT_APP_FIXED_NAVBAR === "true",
});

export const directionState = atom<"ltr" | "rtl">({
  key: "directionState",
  default: defaultLanguage === "AR" ? "rtl" : "ltr",
});

export const layoutState = atom<"dashboard" | "page">({
  key: "layoutState",
  default: process.env.REACT_APP_LAYOUT === "page" ? "page" : "dashboard",
});

export const darkModeState = atom<boolean>({
  key: "darkModeState",
  default: process.env.REACT_APP_DARK_MODE === "true",
});

export const permissionsState = atom<{ [key: string]: boolean }>({
  key: "permissionsState",
  default: {},
});

export const roleState = atom<string>({
  key: "roleState",
  default: "",
});
