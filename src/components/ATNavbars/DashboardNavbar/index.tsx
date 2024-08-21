import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATInput from "components/ATInput";
import ATBadge from "components/ATBadge";

//  ALDR Tech Dashboard examples components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "components/ATNavbars/DashboardNavbar/styles";

import { useTranslation } from "react-i18next";
import { MenuItem } from "@mui/material";
import { useRecoilState } from "recoil";
import { miniSidenavState, transparentNavbarState, darkModeState } from "state/atoms";

// Declaring prop types for DashboardNavbar
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}

function DashboardNavbar({ absolute, light, isMini }: Props): JSX.Element {
  const [navbarType, setNavbarType] = useState<
    "fixed" | "absolute" | "relative" | "static" | "sticky"
  >();
  const [miniSidenav, setMiniSidenav] = useRecoilState(miniSidenavState);
  const [transparentNavbar, setTransparentNavbar] = useRecoilState(transparentNavbarState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [openMenu, setOpenMenu] = useState<any>(false);
  const { pathname, hash } = useLocation();
  const route = pathname.split("/").slice(1);
  if (hash) route.push(decodeURIComponent(hash.slice(1)));

  useEffect(() => {
    // Handling navbar type based on fixedNavbar state
    const newNavbarType = transparentNavbar ? "sticky" : "static";
    setNavbarType(newNavbarType);

    const handleScroll = () => {
      // Why ?
      //const shouldSetTransparent = window.scrollY === 0 && !transparentNavbar;
      //if (shouldSetTransparent) setTransparentNavbar(true);
      //else if (window.scrollY > 0 && transparentNavbar) setTransparentNavbar(false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize state based on current scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [setTransparentNavbar, transparentNavbar]);

  const handleOpenMenu = (event: any) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANGUAGES.split(",");
  const { i18n, t } = useTranslation();
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const isMultiLanguage = process.env.REACT_APP_IS_MULTI_LANGUAGE === "true";
  const isMultiMode = process.env.REACT_APP_IS_MULTI_MODE === "true";

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };
  const handleMiniSidenav = () => setMiniSidenav(!miniSidenav);
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleLanguageMenuClose();
  };

  const handleModeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={navbarContainer}>
        <ATBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route.at(-1)} route={route} light={light} />
          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </ATBox>
        {isMini ? null : (
          <ATBox sx={(theme) => navbarRow(theme, { isMini })}>
            {isMultiLanguage && (
              <>
                <IconButton
                  aria-label="language"
                  aria-controls="language-menu"
                  aria-haspopup="true"
                  onClick={handleLanguageMenuOpen}
                  color="inherit"
                >
                  <Icon>language</Icon>
                </IconButton>
                <Menu
                  id="language-menu"
                  anchorEl={languageAnchorEl}
                  keepMounted
                  open={Boolean(languageAnchorEl)}
                  onClose={handleLanguageMenuClose}
                >
                  {supportedLanguages.map((lang) => (
                    <MenuItem key={lang} onClick={() => handleLanguageChange(lang.toLowerCase())}>
                      {t(lang.toUpperCase())}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            {isMultiMode && (
              <>
                <IconButton
                  aria-label="toggle dark/light mode"
                  onClick={handleModeToggle}
                  color="inherit"
                >
                  <Icon>{darkMode ? "brightness_4" : "brightness_7"}</Icon>
                </IconButton>
              </>
            )}
          </ATBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Declaring default props for DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
