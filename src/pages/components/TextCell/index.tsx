import { type GridRowId } from "@mui/x-data-grid";

// Components
import { ATInput } from "components";

interface Props {
  id: GridRowId;
  field: string;
  value: string;
  isEdit: boolean;
  setEditCellValue?: (params: { id: GridRowId; field: string; value: string }) => void;
}

export default function TextCell({ id, field, value, isEdit, setEditCellValue }: Props) {
  function onChange(value: string) {
    setEditCellValue({ id, field, value });
  }
  return (
    <ATInput
      fullWidth
      variant="outlined"
      value={value}
      onChange={(e: { target: { value: string } }) => isEdit && onChange(e.target.value)}
      sx={isEdit ? {} : { "& fieldset": { border: "none" } }}
      InputProps={{ readOnly: !isEdit }}
      readOnly={true}
    />
  );
}
