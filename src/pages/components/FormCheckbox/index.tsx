import { Checkbox } from "@mui/material";
import { ATInput, ATTypography } from "components";
import { Controller } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  control: any;
  rules?: {
    required: boolean;
    [key: string]: any;
  };
  readOnly?: boolean;
}

const FormCheckbox = ({
  label,
  name,
  control,
  rules = { required: false },
  readOnly = false,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ ...rules }}
      render={({ field }) => (
        <>
          <Checkbox {...field} checked={field.value} color="primary" readOnly={readOnly} />
          <ATTypography
            component="label"
            variant="button"
            fontWeight="regular"
            color="text"
            textTransform="capitalize"
          >
            {label + (rules.required ? "*" : "")}
          </ATTypography>
        </>
      )}
    />
  );
};

export default FormCheckbox;
