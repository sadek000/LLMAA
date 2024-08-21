import { FC, forwardRef } from "react";

//  ALDR Tech Dashboard components
import ATTypography from "components/ATTypography";

// Custom styles for ATProgress
import ATProgressRoot from "components/ATProgress/ATProgressRoot";

// Delcare props types for ATProgress
interface Props {
  variant?: "contained" | "gradient";
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  value: number;
  label?: boolean;
  [key: string]: any;
}

const ATProgress: FC<Props> = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <ATTypography variant="button" fontWeight="medium" color="text">
        {value}%
      </ATTypography>
    )}
    <ATProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

// Declaring default props for ATProgress
ATProgress.defaultProps = {
  variant: "contained",
  color: "info",
  value: 0,
  label: false,
};

export default ATProgress;
