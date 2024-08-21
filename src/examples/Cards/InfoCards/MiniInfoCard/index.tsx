import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  icon: ReactNode;
  title: ReactNode;
  description: string;
  [key: string]: any;
}

function MiniInfoCard({ color, icon, title, description }: Props): JSX.Element {
  return (
    <Card>
      <ATBox p={3}>
        <ATBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="3rem"
          height="3rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon>{icon}</Icon>
        </ATBox>
        <ATBox mt={2.625}>
          <ATTypography variant="h5" fontWeight="medium" textTransform="capitalize">
            {title}
          </ATTypography>
          <ATTypography variant="body2" color="text" fontWeight="regular">
            {description}
          </ATTypography>
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for MiniInfoCard
MiniInfoCard.defaultProps = {
  color: "info",
};

export default MiniInfoCard;
