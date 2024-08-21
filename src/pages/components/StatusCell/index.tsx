// @mui material components
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATButton from "components/ATButton";

// Declaring props types for StatusCell
interface Props {
  icon: string;
  color:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "light"
    | "white"
    | "default";
  status: string;
}

function StatusCell({ icon, color, status }: Props): JSX.Element {
  return (
    <ATBox display="flex" alignItems="center">
      <ATBox mr={1}>
        <ATButton variant="outlined" color={color} size="small" iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
        </ATButton>
      </ATBox>
      <ATTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {status}
      </ATTypography>
    </ATBox>
  );
}

export default StatusCell;
