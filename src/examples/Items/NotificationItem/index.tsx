import { forwardRef, FC, ReactNode } from "react";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { MenuItemProps } from "@mui/material";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// custom styles for the NotificationItem
import menuItem from "examples/Items/NotificationItem/styles";

// Declaring props types for NotificationItem
interface Props extends MenuItemProps {
  icon: ReactNode;
  title: string;
  [key: string]: any;
}

const NotificationItem: FC<Props> = forwardRef(({ icon, title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <ATBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <ATTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </ATTypography>
      <ATTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </ATTypography>
    </ATBox>
  </MenuItem>
));

export default NotificationItem;
