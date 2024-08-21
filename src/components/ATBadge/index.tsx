import { FC, ReactNode, forwardRef } from "react";

// @mui material components
import { BadgeProps } from "@mui/material";

// Custom styles for the ATBadge
import ATBadgeRoot from "components/ATBadge/ATBadgeRoot";

// declaring props types for ATBadge
interface Props extends Omit<BadgeProps, "color" | "variant"> {
  color?: any;
  variant?: "gradient" | "contained";
  size?: "xs" | "sm" | "md" | "lg";
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  children?: ReactNode;
  container?: boolean;
  [key: string]: any;
}

const ATBadge: FC<Props | any> = forwardRef(
  ({ color, variant, size, circular, indicator, border, container, children, ...rest }, ref) => (
    <ATBadgeRoot
      {...rest}
      ownerState={{ color, variant, size, circular, indicator, border, container, children }}
      ref={ref}
      color="default"
    >
      {children}
    </ATBadgeRoot>
  )
);

// declaring default props for ATBadge
ATBadge.defaultProps = {
  color: "info",
  variant: "gradient",
  size: "sm",
  circular: false,
  indicator: false,
  border: false,
  container: false,
  children: false,
};

export default ATBadge;
