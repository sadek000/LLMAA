import { ATInput } from "components";
import { Controller } from "react-hook-form";

interface Props {
  type?: string;
  label: string;
  name: string;
  control: any;
  rules?: {
    required: boolean;
    [key: string]: any;
  };
  helperText: string;
  readOnly?: boolean;
}

const FormField = ({
  type = "text",
  label,
  name,
  control,
  rules = { required: false },
  helperText,
  readOnly = false,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ ...rules }}
      render={({ field, fieldState: { error } }) => (
        <ATInput
          {...field}
          InputProps={{ readOnly }}
          variant="standard"
          type={type}
          label={label + (rules.required ? "*" : "")}
          fullWidth
          error={Boolean(error)}
          helperText={Boolean(error) ? helperText : ""}
          readOnly={true}
        />
      )}
    />
  );
};

export default FormField;
