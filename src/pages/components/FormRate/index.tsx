import { Controller } from "react-hook-form";

import { ATTypography, ATBox, ATDropzone } from "components";

import { Rating, Typography } from "@mui/material";

interface Props {
  label: string;
  name: string;
  control: any;
  rules?: {
    required: boolean;
    [key: string]: any;
  };
  helperText: string;
}

export default function FormRate({
  label,
  name,
  control,
  rules = { required: false },
  helperText,
}: Props) {
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
          <>
            <Rating
              style={{ marginInline: "10px" }}
              precision={0.5}
              value={field.value}
              onChange={(event) => {
                field.onChange(event);
              }}
            />
            {Boolean(error) ? (
              <Typography
                variant="caption"
                className="MuiFormHelperText-root MuiFormHelperText-sizeMedium rtl-1b2wc3c-MuiFormHelperText-root"
              >
                {helperText}
              </Typography>
            ) : (
              ""
            )}
          </>
        )}
      />
    </ATBox>
  );
}
