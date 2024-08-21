import { ReactNode } from "react";

// @mui material components
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import timelineItem from "examples/Timeline/TimelineItem/styles";

// Declaring prop types for TimelineItem
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  icon: ReactNode;
  title: string;
  dateTime: string;
  description?: string;
  lastItem?: boolean;
  [key: string]: any;
}

function TimelineItem({ color, icon, title, dateTime, description, lastItem }: Props): JSX.Element {
  const isDark = useTimeline();

  return (
    <ATBox
      position="relative"
      mb={3}
      sx={(theme: any) => timelineItem(theme, { lastItem, isDark })}
    >
      <ATBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }: any) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </ATBox>
      <ATBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <ATTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </ATTypography>
        <ATBox mt={0.5}>
          <ATTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {dateTime}
          </ATTypography>
        </ATBox>
        <ATBox mt={2} mb={1.5}>
          {description ? (
            <ATTypography variant="button" color={isDark ? "white" : "dark"}>
              {description}
            </ATTypography>
          ) : null}
        </ATBox>
      </ATBox>
    </ATBox>
  );
}

// Declaring default props for TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  lastItem: false,
  description: "",
};

export default TimelineItem;
