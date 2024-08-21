import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Declaring props types for BookingCard
interface Props {
  image: string;
  title: string;
  description: string;
  price: string;
  location: ReactNode;
  action?: ReactNode | boolean;
  [key: string]: any;
}

function BookingCard({ image, title, description, price, location, action }: Props): JSX.Element {
  return (
    <Card
      sx={{
        "&:hover .card-header": {
          transform: action && "translate3d(0, -50px, 0)",
        },
      }}
    >
      <ATBox
        position="relative"
        borderRadius="lg"
        mt={-3}
        mx={2}
        className="card-header"
        sx={{ transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)" }}
      >
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
          top="0"
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </ATBox>
      <ATBox textAlign="center" pt={3} px={3}>
        <ATBox display="flex" justifyContent="center" alignItems="center" mt={action ? -8 : -4.25}>
          {action}
        </ATBox>
        <ATTypography variant="h5" fontWeight="regular" sx={{ mt: 4 }}>
          {title}
        </ATTypography>
        <ATTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }}>
          {description}
        </ATTypography>
      </ATBox>
      <Divider />
      <ATBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={0.5}
        pb={3}
        px={3}
        lineHeight={1}
      >
        <ATTypography variant="body2" fontWeight="regular" color="text">
          {price}
        </ATTypography>
        <ATBox color="text" display="flex" alignItems="center">
          <Icon color="inherit" sx={{ m: 0.5 }}>
            place
          </Icon>
          <ATTypography variant="button" fontWeight="light" color="text">
            {location}
          </ATTypography>
        </ATBox>
      </ATBox>
    </Card>
  );
}

// Declaring default props for BookingCard
BookingCard.defaultProps = {
  action: false,
};

export default BookingCard;
