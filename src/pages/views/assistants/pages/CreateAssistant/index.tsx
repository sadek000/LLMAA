/* eslint-disable */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
  Chip,
  OutlinedInput,
  Box,
} from "@mui/material";
import { ATBox, ATButton, ATInput, ATTypography } from "components";
import { useATTranslation } from "hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "services/api";
import _ from "lodash";
import React from "react";

interface FormInputs {
  title: string;
  description: string;
  type: number;
  dataSources: string[];
}

const i18n = ["Title", "Description", "Type", "Data Sources", "SUBMIT"];

function CreateAssistant(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [Title, Description, Type, DataSources, SUBMIT] = useATTranslation(i18n);
  const [dataSources, setDataSources] = useState<any[]>([]);
  useEffect(() => {
    ApiService.getSilent("/api/app/data-source").then((response: any) => {
      setDataSources(response.data.items);
    });
  }, []);

  useEffect(() => {
    if (id) {
      ApiService.get(`/api/app/assisstant/${id}`).then((response: any) => {
        const { title, description, type, dataSources } = response.data;
        setValue("title", title);
        setValue("description", description);
        setValue("type", type);
        setValue("dataSources", dataSources);
      });
    }
  }, [id, setValue]);

  const [selectedDataSources, setSelectedDataSources] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedDataSources(
      typeof value === "string" ? value.split(",") : value
    );
    setValue("dataSources", typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = (data: FormInputs) => {
    ApiService.post(
      "/api/app/assisstant",
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      navigate("/assistants");
    });
  };

  return (
    <ATBox mb={2}>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <ATBox mb={6} textAlign="center">
            <ATBox mb={1}>
              <ATTypography variant="h3" fontWeight="bold" color="primary">
                Create Assistant
              </ATTypography>
            </ATBox>
          </ATBox>
          <ATBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <ATBox mb={2}>
              <FormControl fullWidth>
                <InputLabel
                  shrink
                  htmlFor="title"
                  style={{ color: "secondary", fontWeight: "bold" }}
                >
                  {Title}
                </InputLabel>
                <ATInput
                  id="title"
                  type="text"
                  fullWidth
                  {...register("title", { required: true })}
                  error={Boolean(errors.title)}
                  helperText={Boolean(errors.title) ? "Title is required" : ""}
                />
              </FormControl>
            </ATBox>
            <ATBox mb={2}>
              <FormControl fullWidth>
                <InputLabel
                  shrink
                  htmlFor="description"
                  style={{ color: "secondary", fontWeight: "bold" }}
                >
                  {Description}
                </InputLabel>
                <ATInput
                  id="description"
                  type="text"
                  fullWidth
                  {...register("description", { required: true })}
                  error={Boolean(errors.description)}
                  helperText={Boolean(errors.description) ? "Description is required" : ""}
                />
              </FormControl>
            </ATBox>
<FormControl fullWidth error={Boolean(errors.type)}>
  <InputLabel id="type-label" shrink={true} sx={{ fontSize: '1.1rem', color: '#333' }}>
    {Type}
  </InputLabel>
  <Select
    labelId="type-label"
    {...register("type", { required: true })}
    label={Type}
    sx={{ backgroundColor: '#fff', borderRadius: '8px', padding: '0.5rem' }}
  >
    <MenuItem value={0}>Semantic</MenuItem>
    <MenuItem value={1}>Summarization</MenuItem>
    {/* Add other types as needed */}
  </Select>
  <FormHelperText>{Boolean(errors.type) ? "Type is required" : ""}</FormHelperText>
</FormControl>

            <ATBox mb={2}>
              <FormControl fullWidth error={Boolean(errors.dataSources)}>
                <InputLabel id="data-sources-label" shrink style={{ color: "secondary", fontWeight: "bold" }}>
                  {DataSources}
                </InputLabel>
                <Select
                  labelId="data-sources-label"
                  multiple
                  value={selectedDataSources}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label={DataSources} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={dataSources.find(ds => ds.id === value)?.title || value} />
                      ))}
                    </Box>
                  )}
                >
                  {dataSources.map((dataSource: any) => (
                    <MenuItem key={dataSource.id} value={dataSource.id}>
                      {dataSource.title}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {Boolean(errors.dataSources) ? "At least one data source is required" : ""}
                </FormHelperText>
              </FormControl>
            </ATBox>
            <ATBox mt={4} mb={1}>
              <ATButton variant="gradient" color="primary" size="large" type="submit" fullWidth>
                {SUBMIT}
              </ATButton>
            </ATBox>
          </ATBox>
        </Grid>
      </Grid>
    </ATBox>
  );
}

export default CreateAssistant;
