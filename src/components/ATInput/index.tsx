import { FC, forwardRef } from "react";

// @mui material components
import { OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";

// Custom styles for ATInput
import ATInputRoot from "components/ATInput/ATInputRoot";

// Declaring props types for ATInput
interface Props extends Omit<OutlinedTextFieldProps | StandardTextFieldProps, "variant"> {
  variant?: "standard" | "outlined";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
}

const ATInput: FC<Props | any> = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <ATInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Declaring default props for ATInput
ATInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

export default ATInput;
