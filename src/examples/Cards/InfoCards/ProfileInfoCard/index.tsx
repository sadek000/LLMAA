// react-routers components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

//  ALDR Tech Dashboard Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

// Declaring props types for ProfileInfoCard
interface Props {
  title: string;
  description: string;
  info: {
    [key: string]: string;
  };
  social: {
    [key: string]: any;
  }[];
  action: {
    route: string;
    tooltip: string;
  };
  shadow?: boolean;
  [key: string]: any;
}

function ProfileInfoCard({ title, description, info, social, action, shadow }: Props): JSX.Element {
  const labels: string[] = [];
  const values: string[] = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <ATBox key={label} display="flex" py={1} pr={2}>
      <ATTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </ATTypography>
      <ATTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </ATTypography>
    </ATBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <ATBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </ATBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <ATBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <ATTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </ATTypography>
        <ATTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </ATTypography>
      </ATBox>
      <ATBox p={2}>
        <ATBox mb={2} lineHeight={1}>
          <ATTypography variant="button" color="text" fontWeight="light">
            {description}
          </ATTypography>
        </ATBox>
        <ATBox opacity={0.3}>
          <Divider />
        </ATBox>
        <ATBox>
          {renderItems}
          <ATBox display="flex" py={1} pr={2}>
            <ATTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </ATTypography>
            {renderSocial}
          </ATBox>
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

export default ProfileInfoCard;
