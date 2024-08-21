import { useMemo, ReactNode } from "react";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// ReportsBarChart configurations
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";

// Declaring props types for ReportsBarChart
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  title: string;
  description?: string | ReactNode;
  date: string;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    };
  };
  [key: string]: any;
}

function ReportsBarChart({ color, title, description, date, chart }: Props): JSX.Element {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card sx={{ height: "100%" }}>
      <ATBox padding="1rem">
        {useMemo(
          () => (
            <ATBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="12.5rem"
            >
              <Bar data={data} options={options} />
            </ATBox>
          ),
          [chart, color]
        )}
        <ATBox pt={3} pb={1} px={1}>
          <ATTypography variant="h6" textTransform="capitalize">
            {title}
          </ATTypography>
          <ATTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </ATTypography>
          <Divider />
          <ATBox display="flex" alignItems="center">
            <ATTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </ATTypography>
            <ATTypography variant="button" color="text" fontWeight="light">
              {date}
            </ATTypography>
          </ATBox>
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
  color: "dark",
  description: "",
};

export default ReportsBarChart;
