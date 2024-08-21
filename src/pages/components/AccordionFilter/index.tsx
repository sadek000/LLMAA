import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useATTranslation } from "hooks";
import { ATBox, ATInput, ATTypography } from "components";
import { Autocomplete } from "@mui/material";
import { ApiService } from "services/api";
import Checkbox from "@mui/material/Checkbox";
import { Loading } from "pages/components";

interface AccordionFilterProps {
  filters: {
    label: string;
    children: {
      name: string;
      label: string;
      type: string;
      options?: any;
    }[];
  }[];
  fieldValues: any;
  setFieldValues: Function;
  reset: any;
}
export default function AccordionFilter({
  filters,
  fieldValues,
  setFieldValues,
  reset,
}: AccordionFilterProps) {
  const i18n = ["name"];
  const [options, setOptions] = React.useState<{ [key: string]: any }>({});
  const [isLoadingN, setIsLoadingN] = React.useState({});

  React.useEffect(() => {
    setFieldValues(fieldValues);
  }, [fieldValues]);

  const handleFieldValueChange = (fieldName: string, value: any) => {
    if (Array.isArray(value)) {
      const updatedValues = { ...fieldValues };
      updatedValues[fieldName] = "";
      for (let i = 0; i < value.length; i++) {
        if (i === 0) {
          updatedValues[fieldName] += `${value[i].id}`;
        } else {
          updatedValues[fieldName] += `,${value[i].id}`;
        }
      }
      setFieldValues(updatedValues);
      console.log("updatedValues", updatedValues);
    } else if (typeof value === "object" && value !== null) {
      setFieldValues((prevValues: any) => ({
        ...prevValues,
        [fieldName]: value.id,
      }));
    } else {
      if (value === true) {
        setFieldValues((prevValues: any) => ({
          ...prevValues,
          [fieldName]: null,
        }));
      } else if (value === false) {
        setFieldValues((prevValues: any) => {
          const { [fieldName]: deletedValue, ...newValues } = prevValues;
          return newValues;
        });
      } else {
        setFieldValues((prevValues: any) => ({
          ...prevValues,
          [fieldName]: value,
        }));
      }
    }
    console.log("fieldValues", fieldValues);
  };
  const handleDependingFields = (fieldName: string, key: string, route: string) => {
    filters?.forEach((item) => {
      item.children.forEach((child) => {
        if (child.name == fieldName) {
          if (fieldValues[key] !== undefined && fieldValues[key] !== undefined) {
            ApiService.getSilent<{
              message: string;
              data?: { id: number; name: string }[];
            }>(`${route + fieldValues[key]}`).then((e) => {
              setOptions((options) => ({ ...options, [child.name]: e.data.data }));
            });
          } else {
            ApiService.getSilent<{
              message: string;
              data?: { id: number; name: string }[];
            }>(`${"/" + child.name + "/all"}`).then((e) => {
              setOptions((options) => ({ ...options, [child.name]: e.data.data }));
            });
          }
        }
      });
    });
  };

  React.useEffect(() => {
    filters?.forEach((item) => {
      item.children.forEach((child) => {
        if (child.type === "select" || child.type === "multi-select") {
          ApiService.getSilent<{
            message: string;
            data?: { id: number; name: string }[];
          }>(`${"/" + child.name + "/all"}`).then((e) => {
            setOptions((options) => ({ ...options, [child.name]: e.data.data }));
          });
        } else if (child.type === "multi-select-with-options") {
          setOptions((options) => ({ ...options, [child.name]: child.options }));
        }
      });
    });
  }, []);
  React.useEffect(() => {
    handleDependingFields("area", "addresses[area][city_id]", "/area/all?city_id=");
  }, [fieldValues["addresses[area][city_id]"]]);

  React.useEffect(() => {
    handleDependingFields(
      "source",
      "educations[educationPath][institutionSource][education_type_id]",
      "/source/all?institutionSources[education_type_id]="
    );
  }, [fieldValues["educations[educationPath][institutionSource][education_type_id]"]]);

  React.useEffect(() => {
    filters.forEach((item) => {
      item.children.forEach((child) => {
        if (child.name === "institution") {
          let params = "?";
          if (
            fieldValues["educations[educationPath][institutionSource][education_type_id]"] !==
              undefined &&
            fieldValues["educations[educationPath][institutionSource][education_type_id]"] !== null
          ) {
            params += `institutionSources[education_type_id]= ${fieldValues["educations[educationPath][institutionSource][education_type_id]"]}&`;
          }
          if (
            fieldValues["educations[educationPath][institutionSource][source_id]"] !== undefined &&
            fieldValues["educations[educationPath][institutionSource][source_id]"] !== null
          ) {
            params += `institutionSources[source_id]= ${fieldValues["educations[educationPath][institutionSource][source_id]"]}&`;
          }
          ApiService.getSilent<{
            message: string;
            data?: any;
          }>(`${"/institution/" + params}`).then((e) => {
            setOptions((options) => ({ ...options, [child.name]: e.data.data.data }));
          });
        }
      });
    });
  }, [
    fieldValues["educations[educationPath][institutionSource][education_type_id]"],
    fieldValues["educations[educationPath][institutionSource][source_id]"],
  ]);
  React.useEffect(() => {
    filters?.forEach((item) => {
      item.children.forEach((child) => {
        if (child.name == "specialization") {
          let params = "?";
          if (
            fieldValues["educations[educationPath][institutionSource][education_type_id]"] !==
              undefined &&
            fieldValues["educations[educationPath][institutionSource][education_type_id]"] !== null
          ) {
            params += `educationPaths[institutionSource][education_type_id]= ${fieldValues["educations[educationPath][institutionSource][education_type_id]"]}&`;
          }
          if (
            fieldValues["educations[educationPath][institutionSource][institution_id]"] !==
              undefined &&
            fieldValues["educations[educationPath][institutionSource][institution_id]"] !== null
          ) {
            params += `educationPaths[institutionSource][institution_id]= ${fieldValues["educations[educationPath][institutionSource][institution_id]"]}&`;
          }
          ApiService.getSilent<{
            message: string;
            data?: any;
          }>(`${"/specialization/" + params}`).then((e) => {
            setOptions((options) => ({ ...options, [child.name]: e.data.data.data }));
          });
        }
      });
    });
  }, [
    fieldValues["educations[educationPath][institutionSource][education_type_id]"],
    fieldValues["educations[educationPath][institutionSource][institution_id]"],
  ]);

  React.useEffect(() => {
    filters?.forEach((item) => {
      item.children.forEach((child) => {
        if (child.name == "department") {
          let params = "?";
          if (
            fieldValues["currentPosition[department][station_id]"] !== undefined &&
            fieldValues["currentPosition[department][station_id]"] !== null
          ) {
            params += `station_id= ${fieldValues["currentPosition[department][station_id]"]}&`;
          }
          if (
            fieldValues["currentPosition[department][directorate_id]"] !== undefined &&
            fieldValues["currentPosition[department][directorate_id]"] !== null
          ) {
            params += `directorate_id= ${fieldValues["currentPosition[department][directorate_id]"]}&`;
            ApiService.getSilent<{
              message: string;
              data?: any;
            }>(`${"/department/" + params}`).then((e) => {
              setOptions((options) => ({ ...options, [child.name]: e.data.data.data }));
            });
          }
        }
      });
    });
  }, [
    fieldValues["currentPosition[department][directorate_id]"],
    fieldValues["currentPosition[department][station_id]"],
  ]);
  const [name] = useATTranslation(i18n);
  const isLoading = false;
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {filters.map((item: any) => (
        <Accordion key={item.label}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={item.label}
            id={item.label}
          >
            {item.label}
          </AccordionSummary>
          <AccordionDetails>
            {item.children.map((child: any) =>
              child.type === "string" ? (
                <ATInput
                  key={child.name}
                  variant="standard"
                  label={child.label}
                  value={fieldValues[child.key] || ""}
                  fullWidth
                  onChange={(ev: any) => {
                    console.log(ev.target.value);
                    handleFieldValueChange(child.key, ev.target.value);
                  }}
                />
              ) : child.type === "select" || child.type === "multi-select-with-options" ? (
                <ATBox key={child.name} style={{ width: "100%" }}>
                  <ATTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    {child.label}
                  </ATTypography>
                  <Autocomplete
                    style={{ width: "100%" }}
                    onChange={(ev: any, val: { id: number; name: string }, res) => {
                      handleFieldValueChange(child.key, val);
                    }}
                    options={options[child.name] ?? []}
                    key={reset}
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
                    renderInput={(params) => (
                      <ATInput variant="standard" {...params} sx={{ display: "flex" }} />
                    )}
                  />
                </ATBox>
              ) : child.type === "multi-select" ? (
                <ATBox key={child.name} style={{ width: "100%" }}>
                  <ATTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    {child.label}
                  </ATTypography>
                  <Autocomplete
                    multiple
                    style={{ width: "100%" }}
                    key={reset}
                    onChange={(ev: any, val: { id: number; name: string }[], res) => {
                      console.log(res, val);
                      handleFieldValueChange(child.key, val);
                      // if (res === "clear") field.onChange({ target: { value: [] } });
                      // else field.onChange({ target: { value: val } });
                      // afterChange();
                    }}
                    options={options[child.name] ?? []}
                    value={fieldValues[child.key]}
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
                    renderInput={(params) => (
                      <ATInput
                        variant="standard"
                        value={fieldValues[child.key] || []}
                        {...params}
                        sx={{ display: "flex" }}
                      />
                    )}
                  />
                </ATBox>
              ) : (
                <ATBox key={child.name} style={{ width: "100%" }}>
                  <ATTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    {child.label}
                  </ATTypography>
                  <Checkbox
                    onChange={(ev: any) => {
                      handleFieldValueChange(child.key, ev.target.checked);
                    }}
                    key={reset}
                  />
                </ATBox>
              )
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
