import { useMemo, ReactNode } from "react";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATProgress from "components/ATProgress";

// ProgressLineChart configurations
import configs from "examples/Charts/LineCharts/ProgressLineChart/config";

// Declaring props types for GradientLineChart
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  icon: ReactNode;
  title: string;
  count?: string | number;
  progress: number;
  height?: string | number;
  chart: {
    labels: string[];
    data: number[];
  };
  [key: string]: any;
}

function ProgressLineChart({
  color,
  icon,
  title,
  count,
  progress,
  height,
  chart,
}: Props): JSX.Element {
  const { data, options } = configs(color, chart.labels || [], title, chart.data || []);

  return (
    <Card>
      <ATBox display="flex" alignItems="center" pt={2} px={2}>
        <ATBox
          width="3rem"
          height="3rem"
          display="grid"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          shadow="md"
          color="white"
          bgColor={color}
          variant="gradient"
        >
          <Icon>{icon}</Icon>
        </ATBox>
        <ATBox ml={2} lineHeight={1}>
          <ATTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color="text"
          >
            {title}
          </ATTypography>
          {count ? (
            <ATTypography variant="h5" fontWeight="bold">
              {count}
            </ATTypography>
          ) : null}
        </ATBox>
        <ATBox width="25%" ml="auto">
          <ATTypography display="block" variant="caption" fontWeight="medium" color="text">
            {progress}%
          </ATTypography>
          <ATBox mt={0.25}>
            <ATProgress variant="gradient" color={color} value={progress} />
          </ATBox>
        </ATBox>
      </ATBox>
      {useMemo(
        () => (
          <ATBox mt={2}>
            <Line data={data} options={options} style={{ height }} />
          </ATBox>
        ),
        [chart, height, color]
      )}
    </Card>
  );
}

// Declaring default props for ProgressLineChart
ProgressLineChart.defaultProps = {
  color: "info",
  count: 0,
  height: "6.25rem",
};

export default ProgressLineChart;
