// react-routers components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATAvatar from "components/ATAvatar";
import ATButton from "components/ATButton";

// Declaring props types for ProfilesList
interface Props {
  title: string;
  profiles: {
    image: string;
    name: string;
    description: string;
    action: {
      type: "external" | "internal";
      route: string;
      color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
      label: string;
    };
  }[];
  shadow?: boolean;
  [key: string]: any;
}

function ProfilesList({ title, profiles, shadow }: Props): JSX.Element {
  const renderProfiles = profiles.map(({ image, name, description, action }) => (
    <ATBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <ATBox mr={2}>
        <ATAvatar src={image} alt="something here" shadow="md" />
      </ATBox>
      <ATBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <ATTypography variant="button" fontWeight="medium">
          {name}
        </ATTypography>
        <ATTypography variant="caption" color="text">
          {description}
        </ATTypography>
      </ATBox>
      <ATBox ml="auto">
        {action.type === "internal" ? (
          <ATButton component={Link} to={action.route} variant="text" color="primary">
            {action.label}
          </ATButton>
        ) : (
          <ATButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </ATButton>
        )}
      </ATBox>
    </ATBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <ATBox pt={2} px={2}>
        <ATTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </ATTypography>
      </ATBox>
      <ATBox p={2}>
        <ATBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring defualt props for ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

export default ProfilesList;
