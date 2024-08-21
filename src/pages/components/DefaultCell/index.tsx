//  ALDR Tech Dashboard components
import ATTypography from "components/ATTypography";

// Declaring props types for DefaultCell
interface Props {
  value: string;
  suffix?: string | boolean;
}

function DefaultCell({ value, suffix }: Props): JSX.Element {
  return (
    <ATTypography variant="caption" fontWeight="medium" color="text">
      {value}
      {suffix && (
        <ATTypography variant="caption" fontWeight="medium" color="secondary">
          &nbsp;&nbsp;{suffix}
        </ATTypography>
      )}
    </ATTypography>
  );
}

// Declaring default props for DefaultCell
DefaultCell.defaultProps = {
  suffix: "",
};

export default DefaultCell;
