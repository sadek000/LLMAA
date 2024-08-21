import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Declaring props types for DefaultInfoCard
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  icon: ReactNode;
  title: string;
  description?: string;
  value?: string | number;
  [key: string]: any;
}

function DefaultInfoCard({ color, icon, title, description, value }: Props): JSX.Element {
  return (
    <Card>
      <ATBox p={2} mx={3} display="flex" justifyContent="center">
        <ATBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon>{icon}</Icon>
        </ATBox>
      </ATBox>
      <ATBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <ATTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </ATTypography>
        {description && (
          <ATTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </ATTypography>
        )}
        {description && !value ? null : <Divider />}
        {value && (
          <ATTypography variant="h5" fontWeight="medium">
            {value}
          </ATTypography>
        )}
      </ATBox>
    </Card>
  );
}

// Declaring default props for DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

export default DefaultInfoCard;
