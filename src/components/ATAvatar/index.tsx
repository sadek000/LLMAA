import { FC, forwardRef } from "react";

// @mui material components
import { AvatarProps } from "@mui/material";

// Custom styles for ATAvatar
import ATAvatarRoot from "components/ATAvatar/ATAvatarRoot";

// declare props types for ATAvatar
interface Props extends AvatarProps {
  bgColor?:
    | "transparent"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  shadow?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "inset";
  [key: string]: any;
}

const ATAvatar: FC<Props> = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <ATAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

// Declaring default props for ATAvatar
ATAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

export default ATAvatar;
