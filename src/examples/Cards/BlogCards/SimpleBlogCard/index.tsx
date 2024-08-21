// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATButton from "components/ATButton";

// Declaring props types for SimpleBlogCard
interface Props {
  image: string;
  title: string;
  description: string;
  action: {
    type: "external" | "internal";
    route: string;
    color:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "dark"
      | "light"
      | "default";
    label: string;
    [key: string]: any;
  };
}

function SimpleBlogCard({ image, title, description, action }: Props): JSX.Element {
  return (
    <Card>
      <ATBox position="relative" borderRadius="lg" mt={-3} mx={2}>
        <ATBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="relative"
          zIndex={1}
        />
        <ATBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top="3%"
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </ATBox>
      <ATBox p={3}>
        <ATTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
          {title}
        </ATTypography>
        <ATBox mt={2} mb={3}>
          <ATTypography variant="body2" component="p" color="text">
            {description}
          </ATTypography>
        </ATBox>
        {action.type === "external" ? (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <ATButton color={action.color ? action.color : "dark"}>{action.label}</ATButton>
          </MuiLink>
        ) : (
          <Link to={action.route}>
            <ATButton color={action.color ? action.color : "dark"}>{action.label}</ATButton>
          </Link>
        )}
      </ATBox>
    </Card>
  );
}

export default SimpleBlogCard;
