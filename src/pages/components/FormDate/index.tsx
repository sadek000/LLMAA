import { Controller } from "react-hook-form";

import { ATInput, ATTypography, ATBox, ATDatePicker } from "components";

import AccountCircle from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
interface Props {
  label: string;
  name: string;
  control?: any;
  rules?: {
    required: boolean;
    [key: string]: any;
  };
  helperText: string;
}

const FormDate = ({ label, name, control, rules = { required: false }, helperText }: Props) => {
  return (
    <ATBox style={{ width: "100%" }}>
      <ATTypography
        component="label"
        variant="button"
        fontWeight="regular"
        color="text"
        textTransform="capitalize"
      >
        {label + (rules.required ? "*" : "")}
      </ATTypography>
      <Controller
        name={name}
        control={control}
        rules={{ ...rules }}
        render={({ field, fieldState: { error } }) => (
          <ATDatePicker
            {...field}
            style={{ width: "100%" }}
            onChange={(ev: any, val: string) => {
              field.onChange({ target: { value: val } });
            }}
            renderInput={(params: any, ref: any) => (
              <ATInput
                {...params}
                inputRef={ref}
                fullWidth
                variant="standard"
                error={Boolean(error)}
                sx={{ display: "flex" }}
                InputProps={{
                  endAdornment: (
                    <CalendarMonthIcon>
                      <AccountCircle />
                    </CalendarMonthIcon>
                  ),
                }}
                helperText={Boolean(error) ? helperText : ""}
              />
            )}
          />
        )}
      />
    </ATBox>
  );
};

export default FormDate;
