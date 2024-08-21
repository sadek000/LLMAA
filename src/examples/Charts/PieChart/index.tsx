import { useMemo, ReactNode } from "react";

// react-chartjs-2 components
import { Pie } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// PieChart configurations
import configs from "examples/Charts/PieChart/configs";

// Declaring props types for PieChart
interface Props {
  icon?: {
    color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
    component: ReactNode;
  };
  title?: string;
  description?: string | ReactNode;
  height?: string | number;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      backgroundColors: string[];
      data: number[];
    };
  };
  [key: string]: any;
}

function PieChart({ icon, title, description, height, chart }: Props): JSX.Element {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderChart = (
    <ATBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <ATBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <ATBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "info"}
              variant="gradient"
              coloredShadow={icon.color || "info"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </ATBox>
          )}
          <ATBox mt={icon.component ? -2 : 0}>
            {title && <ATTypography variant="h6">{title}</ATTypography>}
            <ATBox mb={2}>
              <ATTypography component="div" variant="button" color="text">
                {description}
              </ATTypography>
            </ATBox>
          </ATBox>
        </ATBox>
      ) : null}
      {useMemo(
        () => (
          <ATBox height={height}>
            <Pie data={data} options={options} />
          </ATBox>
        ),
        [chart, height]
      )}
    </ATBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Declaring default props for PieChart
PieChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

export default PieChart;
