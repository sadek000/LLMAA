// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Images
import pattern from "assets/images/illustrations/pattern-tree.svg";
import masterCardLogo from "assets/images/logos/mastercard.png";

interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark";
  number: number;
  holder: string;
  expires: string;
  [key: string]: any;
}

function MasterCard({ color, number, holder, expires }: Props): JSX.Element {
  const numbers: string[] = [...`${number}`];

  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }

  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");

  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
      })}
    >
      <ATBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <ATBox position="relative" zIndex={2} p={2}>
        <ATBox color="white" p={1} lineHeight={0} display="inline-block">
          <Icon>wifi</Icon>
        </ATBox>
        <ATTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 5, pb: 1 }}>
          {num1}&nbsp;&nbsp;&nbsp;{num2}&nbsp;&nbsp;&nbsp;{num3}&nbsp;&nbsp;&nbsp;{num4}
        </ATTypography>
        <ATBox display="flex" justifyContent="space-between" alignItems="center">
          <ATBox display="flex" alignItems="center">
            <ATBox mr={3} lineHeight={1}>
              <ATTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Card Holder
              </ATTypography>
              <ATTypography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {holder}
              </ATTypography>
            </ATBox>
            <ATBox lineHeight={1}>
              <ATTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Expires
              </ATTypography>
              <ATTypography variant="h6" color="white" fontWeight="medium">
                {expires}
              </ATTypography>
            </ATBox>
          </ATBox>
          <ATBox display="flex" justifyContent="flex-end" width="20%">
            <ATBox component="img" src={masterCardLogo} alt="master card" width="60%" mt={1} />
          </ATBox>
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for MasterCard
MasterCard.defaultProps = {
  color: "dark",
};

export default MasterCard;
