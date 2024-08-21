// @mui material components
import { styled, type Theme } from "@mui/material/styles";

export default styled("div")(({ theme, ownerState }: { theme?: Theme | any; ownerState: any }) => {
  const { palette, typography, borders, functions } = theme;
  const { darkMode, isError } = ownerState;

  const { text, white, dark, error, inputBorderColor } = palette;
  const { size } = typography;
  const { borderRadius, borderWidth } = borders;
  const { rgba } = functions;

  return {
    border: `${borderWidth[1]} solid ${isError ? error.main : inputBorderColor} !important`,
    borderRadius: borderRadius.md,
    overflowX: "auto",
    overflowY: "hidden",
    background: `${darkMode ? dark.main : white.main} !important`,
    color: `${text.main} !important`,
    minWidth: "300px",
    height: "130px",
    padding: "10px",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: size.sm,

    "&:has(p)": {
      justifyContent: "center",
      alignItems: "center",
    },

    ".dz-image-container": {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      margin: "0 5px",
    },

    ".dz-image": {
      width: "80px",
      height: "80px",
      border: "1px solid black",
      borderRadius: "10px",
    },

    ".dz-remove": {
      fontSize: size.sm,
      cursor: "pointer",
    },
  };
});
