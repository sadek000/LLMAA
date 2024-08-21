import { ReactNode } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Declaring props types for CategoriesList
interface Props {
  title: string;
  categories: {
    color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
    icon: ReactNode | string;
    name: string;
    description: ReactNode;
    route: string;
  }[];
  [key: string]: any;
}

function CategoriesList({ title, categories }: Props): JSX.Element {
  const renderItems = categories.map(({ color, icon, name, description, route }, key) => (
    <ATBox
      key={name}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      py={1}
      pr={2}
      mb={categories.length - 1 === key ? 0 : 1}
    >
      <ATBox display="flex" alignItems="center">
        <ATBox
          display="grid"
          alignItems="center"
          justifyContent="center"
          bgColor={color}
          borderRadius="lg"
          shadow="md"
          color="white"
          width="2rem"
          height="2rem"
          mr={2}
          variant="gradient"
          fontSize="0.875rem"
        >
          <Icon
            sx={{
              display: "grid",
              placeItems: "center",
            }}
          >
            {icon}
          </Icon>
        </ATBox>
        <ATBox display="flex" flexDirection="column">
          <ATTypography variant="button" color={color} fontWeight="medium" gutterBottom>
            {name}
          </ATTypography>
          <ATTypography variant="caption" color="text">
            {description}
          </ATTypography>
        </ATBox>
      </ATBox>
      <ATBox display="flex">
        <ATTypography
          component={Link}
          variant="button"
          color={color}
          to={route}
          sx={{
            lineHeight: 0,
            transition: "all 0.2s cubic-bezier(.34,1.61,.7,1.3)",
            p: 0.5,

            "&:hover, &:focus": {
              transform: "translateX(5px)",
            },
          }}
        >
          <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
        </ATTypography>
      </ATBox>
    </ATBox>
  ));

  return (
    <Card>
      <ATBox pt={2} px={2}>
        <ATTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </ATTypography>
      </ATBox>
      <ATBox p={2}>
        <ATBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderItems}
        </ATBox>
      </ATBox>
    </Card>
  );
}

export default CategoriesList;
