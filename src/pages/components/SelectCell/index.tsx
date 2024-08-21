import React from "react";
import { ATBox, ATInput } from "components";
import { Autocomplete } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";

interface Props {
  id: GridRowId;
  field: string;
  value: number;
  isEdit: boolean;
  isNew: boolean;
  options: { id: number; name: string }[];
  setEditCellValue?: (params: { id: GridRowId; field: string; value: number }) => void;
}

export default function SelectCell({
  id,
  field,
  value,
  options,
  isEdit,
  isNew,
  setEditCellValue,
}: Props) {
  function onChange(value: number) {
    setEditCellValue({ id, field, value });
  }
  return (
    <Autocomplete
      style={{ width: "100%" }}
      options={options}
      readOnly={!isEdit}
      disabled={field == "parent" && !isNew}
      getOptionLabel={(option: { id: number; name: string }) => option.name}
      renderOption={(props: any, option: { id: number; name: string }) =>
        option.id === 0 && option.name === "" ? (
          <React.Fragment key={props.key}></React.Fragment>
        ) : (
          <ATBox {...props}>{option.name}</ATBox>
        )
      }
      isOptionEqualToValue={(
        option: { id: number; name: string },
        value: { id: number; name: string }
      ) => option.id === value.id}
      value={options.find((e) => e.id === value) ?? { id: 0, name: "" }}
      onChange={(ev: any, val: { id: number; name: string }) => isEdit && onChange(val?.id ?? 0)}
      renderInput={(params) => (
        <ATInput
          fullWidth
          {...params}
          variant="outlined"
          sx={isEdit ? {} : { "& fieldset": { border: "none" } }}
        />
      )}
      sx={isEdit ? {} : { "& fieldset": { border: "none" } }}
    />
  );
}
