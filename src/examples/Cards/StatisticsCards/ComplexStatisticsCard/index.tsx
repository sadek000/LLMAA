import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Declaring props types for CompleStatisticsCard
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  title: string;
  count: string | number;
  percentage?: {
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "white";
    amount: string | number;
    label: string;
  };
  icon: ReactNode;
  [key: string]: any;
}

function ComplexStatisticsCard({ color, title, count, percentage, icon }: Props): JSX.Element {
  return (
    <Card>
      <ATBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <ATBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </ATBox>
        <ATBox textAlign="right" lineHeight={1.25}>
          <ATTypography variant="button" fontWeight="light" color="text">
            {title}
          </ATTypography>
          <ATTypography variant="h4">{count}</ATTypography>
        </ATBox>
      </ATBox>
      <Divider />
      <ATBox pb={2} px={2}>
        <ATTypography component="p" variant="button" color="text" display="flex">
          <ATTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </ATTypography>
          &nbsp;{percentage.label}
        </ATTypography>
      </ATBox>
    </Card>
  );
}

// Declaring defualt props for ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

export default ComplexStatisticsCard;
