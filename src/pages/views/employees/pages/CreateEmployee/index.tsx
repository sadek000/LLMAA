import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ATBox, ATButton, ATInput, ATTypography } from "components";
import { useATTranslation } from "hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "services/api";
import _ from "lodash";

interface FormInputs {
  userName: string;
  password: string;
  email: string;
  appName: boolean;
}

const i18n = ["username", "appName", "Email", "Password", "SUBMIT"];

function CreateEmployee(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Assuming the id is passed as a URL parameter
  const [USERNAME, appName, Email, Password, SUBMIT] = useATTranslation(i18n);
  const [roles, setRoles] = useState<any[]>([]);
  const [value, setValueRadio] = useState("admin");

  useEffect(() => {
    ApiService.getSilent("/api/identity/roles/all").then((response: any) => {
      setRoles(response.data.items);
    });

    if (id) {
      ApiService.get(`/api/identity/users/${id}`).then((response: any) => {
        const { userName, email } = response.data;
        console.log(userName);
        setValue("userName", userName);
        setValue("email", email);
      });
      ApiService.getSilent(`/api/identity/users/${id}/roles`).then((res: any) => {
        setValueRadio(res.data.items[0].name);
      });
    }
  }, [id, setValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };

  const onSubmit = (data: FormInputs) => {
    const apiCall = id
      ? ApiService.put(`/api/identity/users/${id}`, {
          ...data,
          roleNames: [value],
          name: data.userName,
          phoneNumber: "+963954442121",
          surname: data.userName,
          isActive: true,
          lockoutEnabled: true,
          concurrencyStamp: "string",
        })
      : ApiService.post(
          "/api/identity/users",
          {
            ...data,
            roleNames: [value],
            phoneNumber: "+963954442121",
            surname: data.userName,
            name: data.userName,
            isActive: true,
            lockoutEnabled: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

    apiCall.then(() => {
      navigate("/users");
    });
  };

  return (
    <ATBox mb={2}>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <ATBox mb={6} textAlign="center">
            <ATBox mb={1}>
              <ATTypography variant="h3" fontWeight="bold"></ATTypography>
            </ATBox>
          </ATBox>
          <ATBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <ATBox mb={2}>
              <ATInput
                type="email"
                label={Email}
                fullWidth
                {...register("email", {
                  required: true,
                  pattern: new RegExp(".+[@].+[.].+"),
                })}
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) ? "Incorrect email" : ""}
              />
            </ATBox>
            <ATBox mb={2}>
              <ATInput
                type="password"
                label={Password}
                fullWidth
                {...register("password", { required: !id, minLength: 6 })}
                error={Boolean(errors.password)}
                helperText={
                  Boolean(errors.password) ? "Password should be 6 characters at least." : ""
                }
              />
            </ATBox>
            <ATBox mb={2}>
              <ATInput
                type="userName"
                label={USERNAME}
                fullWidth
                {...register("userName", { required: true, minLength: 4 })}
                error={Boolean(errors.userName)}
                helperText={Boolean(errors.userName) ? "should be 4 characters at least." : ""}
              />
            </ATBox>
            {id && (
              <ATBox mb={2}>
                <ATInput
                  type="appName"
                  label={appName}
                  fullWidth
                  {...register("appName", { required: true, minLength: 4 })}
                  error={Boolean(errors.appName)}
                  helperText={Boolean(errors.appName) ? "should be 4 characters at least." : ""}
                />
              </ATBox>
            )}
            <ATBox mb={2}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={value}
                  onChange={handleChange}
                  name="roleNames"
                >
                  {roles?.map((role: any) => (
                    <FormControlLabel
                      key={_.uniqueId()}
                      value={role.name}
                      control={<Radio />}
                      label={role.name}
                    />
                  ))}
                </RadioGroup>
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

export default CreateEmployee;
