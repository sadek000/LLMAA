// @fullcalendar components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// @mui material components
import Card from "@mui/material/Card";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Custom styles for Calendar
import CalendarRoot from "examples/Calendar/CalendarRoot";

// ALDR Tech Dashboard context
import { useDarkMode } from "state/hooks";

// Declaring props types for the Calender
interface Props {
  header?: {
    title?: string;
    date?: string;
  };
  [key: string]: any;
}

function Calendar({ header, ...rest }: Props): JSX.Element {
  const [darkMode] = useDarkMode();

  const validClassNames = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ];

  const events = rest.events
    ? rest.events.map((el: any) => ({
        ...el,
        className: validClassNames.find((item) => item === el.className)
          ? `event-${el.className}`
          : "event-info",
      }))
    : [];

  return (
    <Card sx={{ height: "100%" }}>
      <ATBox pt={header.title || header.date ? 2 : 0} px={2} lineHeight={1}>
        {header.title ? (
          <ATTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {header.title}
          </ATTypography>
        ) : null}
        {header.date ? (
          <ATTypography component="p" variant="button" color="text" fontWeight="regular">
            {header.date}
          </ATTypography>
        ) : null}
      </ATBox>
      <CalendarRoot p={2} ownerState={{ darkMode }}>
        <FullCalendar
          {...rest}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={events}
          height="100%"
        />
      </CalendarRoot>
    </Card>
  );
}

// Declaring default props for Calendar
Calendar.defaultProps = {
  header: {
    title: "",
    date: "",
  },
};

export default Calendar;
