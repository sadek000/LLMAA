import { useState, ReactNode } from "react";

// @mui material components
import Fade from "@mui/material/Fade";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";

// Custom styles for the ATAlert
import ATAlertRoot from "components/ATAlert/ATAlertRoot";
import ATAlertCloseIcon from "components/ATAlert/ATAlertCloseIcon";

// Declaring props types for ATAlert
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  dismissible?: boolean;
  children: ReactNode;
  [key: string]: any;
}

function ATAlert({ color, dismissible, children, ...rest }: Props): JSX.Element | null {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate: any = (mount: boolean = true) => (
    <Fade in={mount} timeout={300}>
      <ATAlertRoot ownerState={{ color }} {...rest}>
        <ATBox display="flex" alignItems="center" color="white">
          {children}
        </ATBox>
        {dismissible ? (
          <ATAlertCloseIcon onClick={mount ? handleAlertStatus : undefined}>
            &times;
          </ATAlertCloseIcon>
        ) : null}
      </ATAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Declaring default props for ATAlert
ATAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

export default ATAlert;
