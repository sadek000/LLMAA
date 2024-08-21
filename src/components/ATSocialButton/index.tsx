import { FC, ReactNode, forwardRef } from "react";

// @mui material components
import { ButtonProps } from "@mui/material";

// Custom styles for ATSocialButton
import ATSocialButtonRoot from "components/ATSocialButton/ATSocialButtonRoot";

// Declaring props types for ATButton
interface Props extends Omit<ButtonProps, "color" | "variant"> {
  color?:
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "pinterest"
    | "youtube"
    | "github"
    | "vimeo"
    | "slack"
    | "dribbble"
    | "reddit"
    | "tumblr";
  size?: "small" | "medium" | "large";
  circular?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const ATSocialButton: FC<Props> = forwardRef(
  ({ color, size, iconOnly, circular, children, ...rest }, ref) => (
    <ATSocialButtonRoot
      {...rest}
      ref={ref}
      variant="contained"
      color="primary"
      size={size}
      ownerState={{ color, size, iconOnly, circular }}
    >
      {children}
    </ATSocialButtonRoot>
  )
);

// Setting default values for the props of ATSocialButton
ATSocialButton.defaultProps = {
  size: "medium",
  color: "facebook",
  iconOnly: false,
  circular: false,
};

export default ATSocialButton;
