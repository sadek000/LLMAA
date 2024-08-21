/* eslint-disable prefer-destructuring */

// @mui material components
import { Theme } from "@mui/material/styles";

function item(theme: Theme | any, ownerState: any) {
  const { palette, borders, functions, transitions } = theme;
  const { active, color, transparentSidenav, whiteSidenav, darkMode } = ownerState;

  const { transparent, white, grey } = palette;
  const { borderRadius } = borders;
  const { rgba } = functions;

  return {
    pl: 3,
    mt: 0.375,
    mb: 0.3,
    width: "100%",
    borderRadius: borderRadius.md,
    cursor: "pointer",
    backgroundColor: () => {
      let backgroundValue = transparent.main;

      if (
        (active === "isParent" && !transparentSidenav && !whiteSidenav) ||
        (active === "isParent" && transparentSidenav && darkMode)
      ) {
        backgroundValue = rgba(white.main, 0.2);
      } else if (active === "isParent" && transparentSidenav) {
        backgroundValue = grey[300];
      } else if (active === "isParent" && whiteSidenav) {
        backgroundValue = grey[200];
      } else if (active) {
        backgroundValue = palette[color].main;
      }

      return backgroundValue;
    },
    transition: transitions.create("background-color", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),

    "&:hover, &:focus": {
      backgroundColor:
        !active &&
        rgba((transparentSidenav && !darkMode) || whiteSidenav ? grey[400] : white.main, 0.2),
    },
  };
}

const itemIcon = ({ palette: { white, grey } }: Theme, { active }: any) => ({
  color: active ? white.main : grey[600],
});

function itemContent(theme: Theme, ownerState: any) {
  const { palette, typography, transitions, functions } = theme;
  const { miniSidenav, name, active, transparentSidenav, whiteSidenav, darkMode } = ownerState;

  const { white, dark } = palette;
  const { size, fontWeightRegular, fontWeightLight } = typography;
  const { pxToRem } = functions;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: `${pxToRem(12)} ${pxToRem(16)}`,
    //marginLeft: pxToRem(18),
    userSelect: "none",
    position: "relative",

    "& span": {
      color:
        ((transparentSidenav && !darkMode) || whiteSidenav) && (active === "isParent" || !active)
          ? dark.main
          : white.main,
      fontWeight: active ? fontWeightRegular : fontWeightLight,
      fontSize: size.sm,
      opacity: miniSidenav ? 0 : 1,
      transition: transitions.create(["opacity", "color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },
  };
}

function itemArrow(theme: Theme, ownerState: any) {
  const { palette, typography, transitions, breakpoints, functions } = theme;
  const { noCollapse, transparentSidenav, whiteSidenav, miniSidenav, open, active, darkMode } =
    ownerState;

  const { white, dark } = palette;
  const { size } = typography;
  const { pxToRem, rgba } = functions;

  return {
    fontSize: `${size.lg} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? "rotate(0)" : "rotate(-180deg)",
    color: () => {
      let colorValue;

      if (transparentSidenav && darkMode) {
        colorValue = open || active ? white.main : rgba(white.main, 0.25);
      } else if (transparentSidenav || whiteSidenav) {
        colorValue = open || active ? dark.main : rgba(dark.main, 0.25);
      } else {
        colorValue = open || active ? white.main : rgba(white.main, 0.5);
      }

      return colorValue;
    },
    transition: transitions.create(["color", "transform", "opacity"], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      display:
        noCollapse || (transparentSidenav && miniSidenav) || miniSidenav
          ? "none !important"
          : "block !important",
    },
  };
}

export { item, itemContent, itemArrow, itemIcon };
