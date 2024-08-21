/* eslint-disable */
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { ATBox, ATButton, ATInput, ATTypography } from "components";
import { useATTranslation } from "hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "services/api";

interface FormInputs {
  title: string;
  description: string;
  type: number;
  attachmentId: string; 
  url: string;
  userName: string;
  password: string;
}

const i18n = [
  "Title",
  "Description",
  "Type",
  "Attachment ID",
  "URL",
  "Username",
  "Password",
  "SUBMIT",
];

function CreateDataSource(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [Title, Description, Type, AttachmentId, URL, Username, Password, SUBMIT] =
    useATTranslation(i18n);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [attachmentIdN, setAttachmentIdN] = useState<string>(""); // Ensure attachmentIdN is a string

  useEffect(() => {
    if (id) {
      ApiService.get(`/api/app/data-source/${id}`).then((response: any) => {
        const { title, description, type, attachmentId, url, userName, password } = response.data;
        setValue("title", title);
        setValue("description", description);
        setValue("type", type);
        setAttachmentIdN(attachmentId); // Update with a single attachmentId string
        setValue("attachmentId", attachmentId);
        setValue("url", url);
        setValue("userName", userName);
        setValue("password", password);
      });
    }
  }, [id, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };
  
  const uploadFiles = async (files: FileList): Promise<{ attachmentIds: string[] }> => {
    try {
      const formData = new FormData();
    
      Array.from(files).forEach((file) => {
        formData.append("files", file);
        formData.append("version", "1.0");
        formData.append("fileName", file.name);
        formData.append("fileExtentions", ".pdf");
      });
    
      const response = await ApiService.post(
        `/api/app/attachment/upload-files?version=1&fileName=aous&fileExtentions=pdf${
          id ? `&attachmentId=${attachmentIdN}` : ""
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status !== 200) {
        throw new Error("Failed to upload files");
      }
      
      // Ensure the response contains a proper array for attachmentFiles
      const attachmentFiles = (response.data as Attachments).attachmentFiles;
      if (!Array.isArray(attachmentFiles)) {
        throw new Error("Invalid data format: attachmentFiles is not an array");
      }

      return {
        attachmentIds: attachmentFiles.map(file => file.attachmentId), // Return array of IDs
      };
    } catch (error) {
      console.error("Upload files error:", error);
      throw error;
    }
  };
  
  const onSubmit = async (data: FormInputs) => {
    try {
      if (selectedFiles) {
        const { attachmentIds } = await uploadFiles(selectedFiles);
        data.attachmentId = attachmentIds.join(","); // Join all attachment IDs into a single string
        setAttachmentIdN(attachmentIds.join(",")); // Store attachment IDs as a comma-separated string
      }
    
      const apiCall = id
        ? ApiService.put(
            `/api/app/data-source/${id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        : ApiService.post(
            "/api/app/data-source",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
      await apiCall;
      navigate("/datasoruces");
    } catch (error) {
      console.error("Submission error:", error);
      
    }
  };
  
  
  return (
    <ATBox mb={4}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <ATBox mb={6} textAlign="center">
            <ATBox mb={1}>
              <ATTypography variant="h4" fontWeight="bold" color="primary">
                {id ? "Edit Data Source" : "Create Data Source"}
              </ATTypography>
            </ATBox>
          </ATBox>
          <ATBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <ATBox mb={3}>
              <ATInput
                type="text"
                label={Title}
                fullWidth
                {...register("title", { required: true })}
                error={Boolean(errors.title)}
                helperText={Boolean(errors.title) ? "Title is required" : ""}
              />
            </ATBox>
            <ATBox mb={3}>
              <ATInput
                type="text"
                label={Description}
                fullWidth
                {...register("description", { required: true })}
                error={Boolean(errors.description)}
                helperText={Boolean(errors.description) ? "Description is required" : ""}
              />
            </ATBox>
            <ATBox mb={3}>
              <FormControl fullWidth error={Boolean(errors.type)}>
                <InputLabel id="type-label" sx={{ fontSize: "1rem" }}>{Type}</InputLabel>
                <Select
                  labelId="type-label"
                  {...register("type", { required: true })}
                  label={Type}
                  sx={{ borderRadius: "8px", padding: "8px" }}
                >
                  <MenuItem value={0}>Attachment</MenuItem>
                  <MenuItem value={1}>GitHub</MenuItem>
                  <MenuItem value={2}>Drive</MenuItem>
                </Select>
                <FormHelperText>{Boolean(errors.type) ? "Type is required" : ""}</FormHelperText>
              </FormControl>
            </ATBox>
  
            <ATBox mb={3}>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="attachmentId"
              />
              <label htmlFor="attachmentId">
                <ATButton variant="contained" component="span" fullWidth>
                  {selectedFiles && selectedFiles.length > 0
                    ? Array.from(selectedFiles).map((file) => file.name).join(", ")
                    : Array.isArray(attachmentIdN)
                    ? attachmentIdN.join(", ")
                    : attachmentIdN || AttachmentId}
                </ATButton>
              </label>
              {errors.attachmentId && (
                <FormHelperText error>Attachment ID is required</FormHelperText>
              )}
            </ATBox>
  
            <ATBox mb={3}>
              {attachmentIdN && !selectedFiles ? (
                <ul style={{ paddingLeft: "16px", listStyleType: "circle" }}>
                  <li>{attachmentIdN}</li>
                </ul>
              ) : null}
            </ATBox>
  
            <ATBox mb={3}>
              <ATInput
                type="url"
                label={URL}
                fullWidth
                {...register("url", { required: true })}
                error={Boolean(errors.url)}
                helperText={Boolean(errors.url) ? "URL is required" : ""}
              />
            </ATBox>
            <ATBox mb={3}>
              <ATInput
                type="text"
                label={Username}
                fullWidth
                {...register("userName", { required: true })}
                error={Boolean(errors.userName)}
                helperText={Boolean(errors.userName) ? "Username is required" : ""}
              />
            </ATBox>
            <ATBox mb={3}>
              <ATInput
                type="password"
                label={Password}
                fullWidth
                {...register("password", { required: true })}
                error={Boolean(errors.password)}
                helperText={Boolean(errors.password) ? "Password is required" : ""}
              />
            </ATBox>
            <ATBox mt={4} mb={2}>
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

export default CreateDataSource;

export type Attachments = {
  creator: null;
  lastModifier: null;
  deleter: null;
  isMultiple: boolean;
  maxFileSize: number;
  fileExtentions: string;
  attachmentFiles: AttachmentFile[];
  isDeleted: boolean;
  deleterId: null;
  deletionTime: null;
  lastModificationTime: null;
  lastModifierId: null;
  creationTime: Date;
  creatorId: string;
};

export type AttachmentFile = {
  creator: null;
  lastModifier: null;
  deleter: null;
  name: string;
  version: string;
  sequenceVersion: number;
  size: number;
  displayName: string;
  extention: string;
  attachmentId: string;
  nextVersionId: null;
  oldVersions: any[];
  isIndexed: boolean;
  isDeleted: boolean;
  deleterId: null;
  deletionTime: null;
  lastModificationTime: null;
  lastModifierId: null;
  creationTime: Date;
  creatorId: string;
};
