//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATAvatar from "components/ATAvatar";

// Declaring props types for CustomerCell
interface Props {
  image?: string;
  name: string;
  color?:
    | "transparent"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
}

function CustomerCell({ image, name, color }: Props): JSX.Element {
  return (
    <ATBox display="flex" alignItems="center">
      <ATBox mr={1}>
        <ATAvatar bgColor={color} src={image} alt={name} size="xs" />
      </ATBox>
      <ATTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {name}
      </ATTypography>
    </ATBox>
  );
}

// Declaring default props for CustomerCell
CustomerCell.defaultProps = {
  image: "",
  color: "dark",
};

export default CustomerCell;
