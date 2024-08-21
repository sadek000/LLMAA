/* eslint-disable no-unused-vars */

import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

//  ALDR Tech Dashboard contexts
import { useDarkMode } from "state/hooks";

// Declaring prop types for DefaultStatisticsCard
interface Props {
  title: string;
  count: string | number;
  percentage?: {
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "white";
    value: string | number;
    label: string;
  };
  dropdown?: {
    action: (...args: any) => void;
    menu: ReactNode;
    value: string;
  };
  [key: string]: any;
}

function DefaultStatisticsCard({ title, count, percentage, dropdown }: Props): JSX.Element {
  const [darkMode] = useDarkMode();

  return (
    <Card>
      <ATBox p={2}>
        <Grid container>
          <Grid item xs={7}>
            <ATBox mb={0.5} lineHeight={1}>
              <ATTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                {title}
              </ATTypography>
            </ATBox>
            <ATBox lineHeight={1}>
              <ATTypography variant="h5" fontWeight="bold">
                {count}
              </ATTypography>
              <ATTypography variant="button" fontWeight="bold" color={percentage.color}>
                {percentage.value}&nbsp;
                <ATTypography
                  variant="button"
                  fontWeight="regular"
                  color={darkMode ? "text" : "secondary"}
                >
                  {percentage.label}
                </ATTypography>
              </ATTypography>
            </ATBox>
          </Grid>
          <Grid item xs={5}>
            {dropdown && (
              <ATBox width="100%" textAlign="right" lineHeight={1}>
                <ATTypography
                  variant="caption"
                  color="secondary"
                  fontWeight="regular"
                  sx={{ cursor: "pointer" }}
                  onClick={dropdown.action}
                >
                  {dropdown.value}
                </ATTypography>
                {dropdown.menu}
              </ATBox>
            )}
          </Grid>
        </Grid>
      </ATBox>
    </Card>
  );
}

// Setting default values for the props of DefaultStatisticsCard
DefaultStatisticsCard.defaultProps = {
  percentage: {
    color: "success",
    value: "",
    label: "",
  },
  dropdown: false,
};

export default DefaultStatisticsCard;
