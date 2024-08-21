import { ReactNode } from "react";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";

// Custom styles for the SidenavItem
import { item, itemContent, itemArrow, itemIcon } from "examples/Sidenav/styles/sidenavItem";

//  ALDR Tech Dashboard contexts
import {
  useDarkMode,
  useToggleMiniSidenav,
  useTransparentNavbar,
  useWhiteSidenav,
} from "state/hooks";

// Declaring props types for SidenavCollapse
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  name: string;
  active?: boolean | string;
  nested?: boolean;
  icon?: any;
  children?: ReactNode;
  open?: boolean;
  [key: string]: any;
}

function SidenavItem({
  color,
  name,
  active,
  nested,
  children,
  open,
  icon,
  ...rest
}: Props): JSX.Element {
  const [darkMode] = useDarkMode();
  const [whiteSidenav] = useWhiteSidenav();
  const [transparentSidenav] = useTransparentNavbar();
  const [miniSidenav] = useToggleMiniSidenav();

  return (
    <>
      <ListItem
        {...rest}
        component="li"
        sx={(theme) => item(theme, { active, color, transparentSidenav, whiteSidenav, darkMode })}
      >
        <Icon sx={(theme) => itemIcon(theme, { active })}>{icon}</Icon>
        <ATBox
          sx={(theme: Theme): any =>
            itemContent(theme, {
              active,
              miniSidenav,
              name,
              open,
              nested,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          <ListItemText primary={name} />
          {children && (
            <Icon
              component="i"
              sx={(theme) =>
                itemArrow(theme, { open, miniSidenav, transparentSidenav, whiteSidenav, darkMode })
              }
            >
              expand_less
            </Icon>
          )}
        </ATBox>
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit {...rest}>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Declaring default props for SidenavItem
SidenavItem.defaultProps = {
  color: "info",
  active: false,
  nested: false,
  children: false,
  open: false,
};

export default SidenavItem;
