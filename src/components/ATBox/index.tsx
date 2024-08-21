import { forwardRef, FC } from "react";

// @mui material components
import { BoxProps } from "@mui/material";

// Custom styles for ATBox
import ATBoxRoot from "components/ATBox/ATBoxRoot";

// declaring props types for ATBox
interface Props extends BoxProps {
  variant?: "contained" | "gradient";
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?: string;
  [key: string]: any;
}

const ATBox: FC<Props> = forwardRef(
  ({ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, ...rest }, ref) => (
    <ATBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

// Declaring default props for ATBox
ATBox.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
  coloredShadow: "none",
};

export default ATBox;
