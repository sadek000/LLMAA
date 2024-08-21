import { useState, useEffect, useMemo, JSXElementConstructor, Key, ReactElement } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//  Dashboard exampless
import Sidenav from "examples/Sidenav";

//  Dashboard themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

//  Dashboard Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes/routes";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

//Auth And Route Protection
import ProtectedRoute from "routes/ProtectedRoute";

import {
  useTransparentSidenav,
  useSidenavColor,
  useDarkMode,
  useDirection,
  useLayout,
  useWhiteSidenav,
} from "state/hooks";
import { useSetRecoilState } from "recoil";
import { miniSidenavState } from "state/atoms";
import { useHandleLanguageChange } from "hooks/useHandleLanguageChange";
import { Illustration } from "components";
import { CreateEmployee } from "pages/views/employees";
import AIChat from "pages/aichat";

export default function App() {
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [sidenavColor] = useSidenavColor();
  const [darkMode] = useDarkMode();
  const [transparentSidenav] = useTransparentSidenav();
  const [direction] = useDirection();
  const [layout] = useLayout();
  const [whiteSidenav] = useWhiteSidenav();
  const setMiniSidenav = useSetRecoilState(miniSidenavState);
  useHandleLanguageChange();

  // Cache for the rtl
  useMemo(() => {
    const pluginRtl: any = rtlPlugin;
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [pluginRtl],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (!onMouseEnter) {
      setMiniSidenav(false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    setMiniSidenav(process.env.REACT_APP_MINI_SIDENAV === "true");
  }, []);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes: any[]): any =>
    allRoutes.map(
      (route: {
        collapse: any;
        route: string;
        component: ReactElement<any, string | JSXElementConstructor<any>>;
        key: Key;
      }) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return (
            <Route
              path={route.route}
              element={<ProtectedRoute>{route.component}</ProtectedRoute>}
              key={route.key}
            />
          );
        }

        return null;
      }
    );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName={process.env.REACT_APP_CLIENT_NAME}
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        )}
        <Routes>
          {/*Auth Routes*/}
          <Route path="/authentication/sign-in" element={<Illustration />} />
          <Route
            path="/aichat"
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/add"
            element={
              <ProtectedRoute>
                <CreateEmployee />
              </ProtectedRoute>
            }
          />

          {/* Other Routes */}
          {getRoutes(routes)}

          {/*Redirecting Route*/}
          <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName={process.env.REACT_APP_CLIENT_NAME}
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      <Routes>
        {/*Auth Routes*/}
        <Route path="/authentication/sign-in" element={<Illustration />} />
        <Route
          path="/aichat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />

        {/* Other Routes */}
        {getRoutes(routes)}

        {/*Redirecting Route*/}
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    </ThemeProvider>
  );
}
