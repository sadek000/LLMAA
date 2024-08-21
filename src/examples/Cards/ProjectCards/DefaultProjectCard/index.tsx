// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATButton from "components/ATButton";
import ATAvatar from "components/ATAvatar";

// Declaring props types for DefaultProjectCard
interface Props {
  image: string;
  label: string;
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
      | "light"
      | "dark"
      | "white";
    label: string;
  };
  authors?: {
    image: string;
    name: string;
  }[];
  [key: string]: any;
}

function DefaultProjectCard({
  image,
  label,
  title,
  description,
  action,
  authors,
}: Props): JSX.Element {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <ATAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <ATBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </ATBox>
      <ATBox mt={1} mx={0.5}>
        <ATTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </ATTypography>
        <ATBox mb={1}>
          {action.type === "internal" ? (
            <ATTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </ATTypography>
          ) : (
            <ATTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </ATTypography>
          )}
        </ATBox>
        <ATBox mb={3} lineHeight={0}>
          <ATTypography variant="button" fontWeight="light" color="text">
            {description}
          </ATTypography>
        </ATBox>
        <ATBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <ATButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </ATButton>
          ) : (
            <ATButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </ATButton>
          )}
          <ATBox display="flex">{renderAuthors}</ATBox>
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

export default DefaultProjectCard;
