/* eslint-disable */
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import ATBox from "components/ATBox";
import ATTypography from "components/ATTypography";
import ATInput from "components/ATInput";
import ATButton from "components/ATButton";
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import { useForm } from "react-hook-form";
import { useATTranslation, useCookieManager } from "hooks";
import IllustrationLayout from "components/authentication/components/IllustrationLayout";
import { ApiService } from "services/api";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  username: string;
  password: string;
  rememberMe: boolean;
}
const i18n = ["sign_in", "login_description", "Email", "Password", "remember_me"];

function Illustration(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [SIGNIN, LOGIN_DESCRIPTION, Email, Password, REMEMBERME] = useATTranslation(i18n);
  const navigate = useNavigate();
  const { setToken } = useCookieManager();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (data: FormInputs) => {
    ApiService.post("/connect/token", {
      ...data,
      grant_type: "password",
      scope: "offline_access LLMAA",
      client_id: "LLMAA_App",
    })
      .then((response: any) => {
        setToken(response.data.access_token);
        navigate("/aichat");
      })
      .catch((error: any) => {
        setErrorMessage("Incorrect username or password. Please try again.");
      });
  };

  return (
    <IllustrationLayout title={SIGNIN} description={LOGIN_DESCRIPTION} illustration={bgImage}>
      <ATBox component="form" role="form">
        <ATBox mb={2}>
          <ATInput
            type="email"
            label={Email}
            fullWidth
            {...register("username", {
              required: true,
            })}
            error={Boolean(errors.username)}
            helperText={Boolean(errors.username) ? "Incorrect email" : ""}
          />
        </ATBox>
        <ATBox mb={2}>
          <ATInput
            type="password"
            label={Password}
            fullWidth
            {...register("password", { required: true, minLength: 6 })}
            error={Boolean(errors.password)}
            helperText={Boolean(errors.password) ? "Password should be 6 characters at least." : ""}
          />
        </ATBox>
        <ATBox display="flex" alignItems="center" ml={-1}>
          <Switch {...register("rememberMe")} />
          <ATTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;{REMEMBERME}
          </ATTypography>
        </ATBox>
        
        {/* عرض رسالة الخطأ في واجهة المستخدم */}
        {errorMessage && (
          <ATBox mt={2} mb={2}>
            <ATTypography color="error">{errorMessage}</ATTypography>
          </ATBox>
        )}

        <ATBox mt={4} mb={1}>
          <ATButton
            variant="gradient"
            size="large"
            onClick={handleSubmit(onSubmit)}
            fullWidth
          >
            {SIGNIN}
          </ATButton>
        </ATBox>
      </ATBox>
    </IllustrationLayout>
  );
}

export default Illustration;
