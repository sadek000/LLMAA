import React from "react";
import { Controller } from "react-hook-form";

import Autocomplete from "@mui/material/Autocomplete";

import { ATInput, ATTypography, ATBox } from "components";

interface Props {
  label: string;
  name: string;
  control: any;
  rules?: {
    required: boolean;
    [key: string]: any;
  };
  options: any[];
  autocompleteProps?: Object;
  helperText: string;
  afterChange?: () => void;
}

const FormMultiSelect = ({
  label,
  name,
  control,
  rules = { required: false },
  options,
  autocompleteProps = {},
  helperText,
  afterChange = () => {},
}: Props) => {
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
        rules={{
          validate: (value: { id: number; name: string }[]) => value.length !== 0,
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            multiple
            style={{ width: "100%" }}
            onChange={(ev: any, val: { id: number; name: string }[], res) => {
              console.log(res, val);

              if (res === "clear") field.onChange({ target: { value: [] } });
              else field.onChange({ target: { value: val } });
              afterChange();
            }}
            options={options}
            getOptionLabel={(option: { id: number; name: string }) => option.name}
            renderOption={(props: any, option: { id: number; name: string }) =>
              option.id === 0 && option.name === "" ? (
                <React.Fragment key={props.id}></React.Fragment>
              ) : (
                <ATBox {...props} key={option.id}>
                  {option.name}
                </ATBox>
              )
            }
            isOptionEqualToValue={(
              option: { id: number; name: string },
              value: { id: number; name: string }
            ) => option.id === value.id}
            {...autocompleteProps}
            renderInput={(params) => (
              <ATInput
                variant="standard"
                {...params}
                error={Boolean(error)}
                helperText={Boolean(error) ? helperText : ""}
                sx={{ display: "flex" }}
              />
            )}
          />
        )}
      />
    </ATBox>
  );
};

export default FormMultiSelect;
