// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATButton from "components/ATButton";

// Declaring props types for DefaultPricingCard
interface Props {
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
    | "white";
  badge: {
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
    label: string;
  };
  price: {
    currency: string;
    value: string;
    type: string;
  };
  specifications: {
    label: string;
    includes?: boolean;
  }[];
  action: {
    type: "external" | "internal";
    route: string;
    label: string;
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  };
  shadow?: boolean;
  [key: string]: any;
}

function DefaultPricingCard({
  color,
  badge,
  price,
  specifications,
  action,
  shadow,
}: Props): JSX.Element {
  const renderSpecifications = specifications.map(({ label, includes }) => (
    <ATBox key={label} display="flex" alignItems="center" p={1}>
      <ATBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="1.5rem"
        height="1.5rem"
        mr={2}
        mt={-0.125}
      >
        <ATTypography
          variant="body1"
          color={color === "white" ? "text" : "white"}
          sx={{ lineHeight: 0 }}
        >
          <Icon>{includes ? "done" : "remove"}</Icon>
        </ATTypography>
      </ATBox>
      <ATTypography
        variant="body2"
        color={color === "white" ? "text" : "white"}
        fontWeight="regular"
      >
        {label}
      </ATTypography>
    </ATBox>
  ));

  return (
    <Card sx={{ boxShadow: ({ boxShadows: { lg } }) => (shadow ? lg : "none") }}>
      <ATBox
        bgColor={color}
        variant={color === "white" ? "contained" : "gradient"}
        borderRadius="xl"
      >
        <ATBox
          bgColor={badge.color}
          width="max-content"
          px={4}
          pt={0}
          pb={0.5}
          mx="auto"
          mt={-1.375}
          borderRadius="section"
          lineHeight={1}
        >
          <ATTypography
            variant="caption"
            textTransform="uppercase"
            fontWeight="medium"
            color={badge.color === "light" ? "dark" : "white"}
          >
            {badge.label}
          </ATTypography>
        </ATBox>
        <ATBox pt={3} pb={2} px={2} textAlign="center">
          <ATBox my={1}>
            <ATTypography variant="h1" color={color === "white" ? "dark" : "white"}>
              <ATTypography
                display="inline"
                component="small"
                variant="h5"
                color="inherit"
                verticalAlign="top"
              >
                {price.currency}
              </ATTypography>
              {price.value}
              <ATTypography display="inline" component="small" variant="h5" color="inherit">
                /{price.type}
              </ATTypography>
            </ATTypography>
          </ATBox>
        </ATBox>
        <ATBox pb={3} px={3}>
          {renderSpecifications}
          {action.type === "internal" ? (
            <ATBox mt={3}>
              <ATButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color}
                fullWidth
              >
                {action.label}&nbsp;
                <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </ATButton>
            </ATBox>
          ) : (
            <ATBox mt={3}>
              <ATButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color}
                fullWidth
              >
                {action.label}&nbsp;
                <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </ATButton>
            </ATBox>
          )}
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for DefaultPricingCard
DefaultPricingCard.defaultProps = {
  color: "white",
  shadow: true,
};

export default DefaultPricingCard;
