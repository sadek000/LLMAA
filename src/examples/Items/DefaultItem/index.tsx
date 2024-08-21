import { forwardRef, FC, ReactNode } from "react";

// @mui material components
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// custom styles for the DefaultItem
import defaultItemIconBox from "examples/Items/DefaultItem/styles";

// Declaring props types for DefaultItem
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  icon: ReactNode;
  title: string;
  description: string;
  [key: string]: any;
}

const DefaultItem: FC<Props> = forwardRef(({ color, icon, title, description, ...rest }, ref) => (
  <ATBox {...rest} ref={ref} display="flex" alignItems="center">
    <ATBox sx={(theme) => defaultItemIconBox(theme, { color })}>
      <Icon>{icon}</Icon>
    </ATBox>
    <ATBox ml={2} mt={0.5} lineHeight={1.4}>
      <ATTypography display="block" variant="button" fontWeight="medium">
        {title}
      </ATTypography>
      <ATTypography variant="button" fontWeight="regular" color="text">
        {description}
      </ATTypography>
    </ATBox>
  </ATBox>
));

// Declaring default props for DefaultItem
DefaultItem.defaultProps = {
  color: "info",
};

export default DefaultItem;
