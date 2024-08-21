import { Icon } from "@mui/material";
import { ATButton } from "components";

interface Props {
  onClick: () => void;
  additionalChildren?: JSX.Element;
}

export default function AddButton({ onClick, additionalChildren }: Props) {
  return (
    <ATButton
      variant="text"
      size="large"
      color="primary"
      circular
      iconOnly={additionalChildren ? false : true}
      onClick={onClick}
    >
      <Icon>add</Icon>
      {additionalChildren}
    </ATButton>
  );
}
