import { Controller } from "react-hook-form";

import { ATTypography, ATBox, ATDropzone } from "components";

import { Typography } from "@mui/material";

interface Props {
  label: string;
  name: string;
  control: any;
  rules?: {
    required: boolean;
    [key: string]: any;
  };
  maxFiles?: number;
  helperText: string;
}

export default function FormImage({
  label,
  name,
  control,
  rules = { required: false },
  helperText,
  maxFiles = Infinity,
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
            <ATDropzone
              files={field.value ?? []}
              accept={{ "image/*": [], "application/pdf": [] }}
              onChange={(e) => {
                field.onChange(e);
              }}
              isError={Boolean(error)}
              maxFiles={maxFiles}
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
