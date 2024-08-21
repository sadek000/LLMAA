import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// ALDR Tech Dashboard context
import { useDarkMode } from "state/hooks";

// Declaring props types for ControllerCard
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  state?: boolean;
  icon: ReactNode;
  title: string;
  description?: string;
  onChange: () => void;
  [key: string]: any;
}

function ControllerCard({ color, state, icon, title, description, onChange }: Props): JSX.Element {
  const [darkMode] = useDarkMode();

  return (
    <Card sx={{ height: "100%", overflow: "hidden" }}>
      <ATBox
        p={3}
        height="100%"
        bgColor={state ? color : "white"}
        variant="gradient"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={({ palette: { background } }: { palette: any }) => ({
          background: darkMode && !state && background.card,
        })}
      >
        <ATBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <ATTypography variant="body2" color={state ? "white" : "text"}>
            {state ? "On" : "Off"}
          </ATTypography>
          <ATBox mt={-0.5} mr={-1.5}>
            <Switch checked={state} onChange={onChange} />
          </ATBox>
        </ATBox>
        {icon}
        <ATBox mt={1} lineHeight={1}>
          <ATTypography variant="body2" color={state ? "white" : "text"} textTransform="capitalize">
            {title}
          </ATTypography>
          {description ? (
            <ATTypography variant="caption" color={state ? "white" : "text"}>
              {description}
            </ATTypography>
          ) : null}
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for ControllerCard
ControllerCard.defaultProps = {
  color: "info",
  state: false,
  description: "",
};

export default ControllerCard;
