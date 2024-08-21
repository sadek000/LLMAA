// @mui material components
import Checkbox from "@mui/material/Checkbox";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";

// Declaring props types for IdCell
interface Props {
  id: string;
  checked?: boolean;
}

function IdCell({ id, checked }: Props): JSX.Element {
  return (
    <ATBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <ATBox ml={1}>
        <ATTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </ATTypography>
      </ATBox>
    </ATBox>
  );
}

// Declaring default props for IdCell
IdCell.defaultProps = {
  checked: false,
};

export default IdCell;
