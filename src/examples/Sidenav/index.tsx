import { useEffect, useState, ReactNode, useMemo } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

//  ALDR Tech Dashboard examples components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavList from "examples/Sidenav/SidenavList";
import SidenavItem from "examples/Sidenav/SidenavItem";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import {
  miniSidenavState,
  transparentSidenavState,
  whiteSidenavState,
  darkModeState,
} from "state/atoms";

// Declaring props types for Sidenav
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  brand?: string;
  brandName: string;
  routes: {
    [key: string]:
      | ReactNode
      | string
      | boolean
      | {
          [key: string]:
            | ReactNode
            | boolean
            | string
            | {
                [key: string]: ReactNode | string | boolean;
              }[];
        }[];
  }[];
  [key: string]: any;
}

function Sidenav({ color, brand, brandName, routes, ...rest }: Props): JSX.Element {
  const [openCollapse, setOpenCollapse] = useState<boolean | string>(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState<boolean | string>(false);
  const [miniSidenav, setMiniSidenav] = useRecoilState(miniSidenavState);
  const [transparentSidenav] = useRecoilState(transparentSidenavState);
  const [whiteSidenav] = useRecoilState(whiteSidenavState);
  const [darkMode] = useRecoilState(darkModeState);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const collapseName = pathname.split("/").slice(1)[0];
  const items = pathname.split("/").slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];
  let textColor:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "white"
    | "inherit"
    | "text"
    | "light" = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  useEffect(() => {
    // Automatically collapse/expand sidenav based on window width or user interactions
    const handleResize = () => {
      const shouldMiniSidenav = window.innerWidth < 1200;
      setMiniSidenav(shouldMiniSidenav);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setMiniSidenav]);
  // Close sidenav function
  const closeSidenav = () => setMiniSidenav(true);
  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) => {
    const template = collapse.map(({ name, route, key, href, icon }: any) =>
      href ? (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem icon={icon} name={t(name)} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
          <SidenavItem name={t(name)} active={route === pathname} icon={icon} nested />
        </NavLink>
      )
    );

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses
      .filter((link: any) => {
        return !link.notInNavBar;
      })
      .map(({ name, collapse, route, href, key, icon, hidden }: any) => {
        let returnValue;
        if (collapse && !hidden) {
          returnValue = (
            <SidenavItem
              key={key}
              color={color}
              icon={icon}
              name={t(name)}
              active={key === itemParentName ? "isParent" : false}
              open={openNestedCollapse === key}
              onClick={({ currentTarget }: any) =>
                openNestedCollapse === key && currentTarget.classList.contains("MuiListItem-root")
                  ? setOpenNestedCollapse(false)
                  : setOpenNestedCollapse(key)
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          );
        } else if (!hidden) {
          returnValue = href ? (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavItem icon={icon} color={color} name={t(name)} active={route === pathname} />
            </Link>
          ) : (
            <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
              <SidenavItem icon={icon} color={color} name={t(name)} active={route === pathname} />
            </NavLink>
          );
        }
        return <SidenavList key={key}>{returnValue}</SidenavList>;
      });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }: any) => {
      let returnValue;
      if (type === "collapse") {
        if (href) {
          returnValue = (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                name={t(name)}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </Link>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={t(name)}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={t(name)}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <ATTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {t(title)}
          </ATTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      } else {
        returnValue = (
          <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
            <SidenavItem icon={icon} color={color} name={t(name)} active={key === itemName} />
          </NavLink>
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <ATBox pt={3} pb={1} px={4} textAlign="center">
        <ATBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <ATTypography variant="h6" color="info">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </ATTypography>
        </ATBox>
        <ATBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <ATBox component="img" src={brand} alt="Brand" width="2rem" />}
          <ATBox
            width={!brandName && "100%"}
            sx={(theme: any) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <ATTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </ATTypography>
          </ATBox>
        </ATBox>
      </ATBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Declaring default props for Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

export default Sidenav;
