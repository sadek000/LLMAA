/* eslint-disable */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import i18n from "i18n";
import https from "https-browserify";
import fs from "browserify-fs";

interface ApiResponse<T> {
  data: T;
  status: number;
}

const baseURL = process.env.REACT_APP_API_URL;

// Base64 encoded CA certificate
const caBase64 =
  "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tDQpNSUlHeGpDQ0JhNmdBd0lCQWdJU0E5ZytrM3NkNE1HLzJTQVZWQzUzTTR4Qk1BMEdDU3FHU0liM0RRRUJDd1VBDQpNREl4Q3pBSkJnTlZCQVlUQWxWVE1SWXdGQVlEVlFRS0V3MU1aWFFuY3lCRmJtTnllWEIwTVFzd0NRWURWUVFEDQpFd0pTTXpBZUZ3MHlOREExTXpFd05qVXlNelphRncweU5EQTRNamt3TmpVeU16VmFNQzB4S3pBcEJnTlZCQU1UDQpJbUZ0WlhKdGIzVnVkQzFqWVM1eWFub3VlbTF4TG0xNVlteDFaV2h2YzNRdWJXVXdnZ0VpTUEwR0NTcUdTSWIzDQpEUUVCQVFVQUE0SUJEd0F3Z2dFS0FvSUJBUUNSN3NXc3QvMGJGb1U0SjRia21jOXc2V01mVEdVREZRRHN0dFB5DQpESUEySjZ2RXBtZElqNjZLZHhUeEtKT3lzVzdmcnpTUmNyRHBNTVgwWlJQKzRiRkdpamw5RUQvVFZ4RjJPQVZlDQpjZXVuYmZMV0dtcE5ROVJkMnlxbGhUN2NhWmNqalVlbDkwUlZidXNxb25MVWs5R1AvcHhiWDkwK2pJSFVQd1NtDQpvUHVNUXozc3pHYmdzUVNvckJXdzV6UW1BM3NKZGNyTWFSR0UwdG5Obytya0F6eUIra1R3R1d2UnVrMHFzdEtBDQpQYTNoR3lVT2VzNGtCbVVSeERTTGx6bTZSVDNJdTdOZ1huaDR3dTlPeVV6OSsrQ1JlYUVBeGkwMHY1UGNhZ2dZDQpiaWErWXRjV1Rma0hhakppZi96bE5BRUZaZmx1SnZuc3JoRHBPVGhGK3ZYZW5iSVBBZ01CQUFHamdnUFpNSUlEDQoxVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdIUVlEVlIwbEJCWXdGQVlJS3dZQkJRVUhBd0VHQ0NzR0FRVUZCd01DDQpNQXdHQTFVZEV3RUIvd1FDTUFBd0hRWURWUjBPQkJZRUZJWDNjQUoyNEkxazlnZVZvSHorbzhobW9HVFhNQjhHDQpBMVVkSXdRWU1CYUFGQlF1c3hlM1dGYkxybEFKUU9ZZnI1MkxGTUxHTUZVR0NDc0dBUVVGQndFQkJFa3dSekFoDQpCZ2dyQmdFRkJRY3dBWVlWYUhSMGNEb3ZMM0l6TG04dWJHVnVZM0l1YjNKbk1DSUdDQ3NHQVFVRkJ6QUNoaFpvDQpkSFJ3T2k4dmNqTXVhUzVzWlc1amNpNXZjbWN2TUlJQjRBWURWUjBSQklJQjF6Q0NBZE9DQ0dGdFpYSXVZMjl0DQpnaHBoYldWeUxuSnFlaTU2YlhFdWJYbGliSFZsYUc5emRDNXRaWUlpWVcxbGNtMXZkVzUwTFdOaExuSnFlaTU2DQpiWEV1YlhsaWJIVmxhRzl6ZEM1dFpZSU1ZVzFsY20xdmRXNTBMbU5oZ2cxaGJXVnliVzkxYm5RdVkyOXRnaDloDQpiV1Z5Ylc5MWJuUXVjbXA2TG5wdGNTNXRlV0pzZFdWb2IzTjBMbTFsZ2lOaGJXVnliVzkxYm5SekxXTmhMbkpxDQplaTU2YlhFdWJYbGliSFZsYUc5emRDNXRaWUlOWVcxbGNtMXZkVzUwY3k1allZSVJiV0ZwYkM1aGJXVnliVzkxDQpiblF1WTJHQ0VtMWhhV3d1WVcxbGNtMXZkVzUwTG1OdmJZSVNiV0ZwYkM1aGJXVnliVzkxYm5SekxtTmhnZ3gzDQpkM2N1WVcxbGNpNWpiMjJDSG5kM2R5NWhiV1Z5TG5KcWVpNTZiWEV1YlhsaWJIVmxhRzl6ZEM1dFpZSW1kM2QzDQpMbUZ0WlhKdGIzVnVkQzFqWVM1eWFub3VlbTF4TG0xNVlteDFaV2h2YzNRdWJXV0NFSGQzZHk1aGJXVnliVzkxDQpiblF1WTJHQ0VYZDNkeTVoYldWeWJXOTFiblF1WTI5dGdpTjNkM2N1WVcxbGNtMXZkVzUwTG5KcWVpNTZiWEV1DQpiWGxpYkhWbGFHOXpkQzV0WllJbmQzZDNMbUZ0WlhKdGIzVnVkSE10WTJFdWNtcDZMbnB0Y1M1dGVXSnNkV1ZvDQpiM04wTG0xbGdoRjNkM2N1WVcxbGNtMXZkVzUwY3k1allUQVRCZ05WSFNBRUREQUtNQWdHQm1lQkRBRUNBVENDDQpBUVFHQ2lzR0FRUUIxbmtDQkFJRWdmVUVnZklBOEFCMkFFaXc0MnZhcGtjMEQrVnFBdnFkTU9zY1VnSExWdDBzDQpnZG03djZzNTJJUnpBQUFCajgyaTZnc0FBQVFEQUVjd1JRSWdFcVdKK1BjL2swaFRCaERzcHphSStvR0tHZE9ZDQpHTm92U0VTVlN2S01WT2dDSVFDQitQU3ZrUXhVcVgzZ1p6dTVkM21OYWg0M2o5ZTltanQ5TCtJTXFyMGJmd0IyDQpBTzdOMEdUVjJ4ck94VnkzbmJUTkU2SXloMFo4dk96ZXcxRklXVVp4SDdXYkFBQUJqODJpNmc0QUFBUURBRWN3DQpSUUloQU1FalpoN3JORlh6M2tnR0JhRlZuZmdtdHZ6cVVUaVF3ZnYzM1k0RVVXTHFBaUFOM3NDMXh4WG1uQ2lUDQptbEE0SFlCMVkyRG9tbmwyTEVFbTJUekh6L3pMOHpBTkJna3Foa2lHOXcwQkFRc0ZBQU9DQVFFQUtGK1d6Y0Y1DQpldldVOUUwcDhVWDc1RXlHc1JSZEJDTkRQN0ZzZXQ2YWpNVHFJdGNyK25QUlpnLzh1NldrNExCcVRYc0VKNnJYDQo4YjFqOXVhZ3RvSjJMVzdUeDUzZlhLSGk5Yzk0bWJaMzl5YjlsUDdZUGdBeDhQNG43S1hHU1k2Q0l4eVNaSUkxDQp1Uy84ZWE1Q0ZuTkgyVG0rTjFlbG04STh5dVZqb042ZmJKaThCVS85bE45SzdWdHc3Ym12NEZvR2NWSUp6cnk3DQpBazZlTHVWRnQzYTFEZTdmRW1EcFM3WDM2UUhna3I0b2NzZkFKUnZYcXhXM2Y1SERKZjJmRjJDZHRrcGVVb01SDQp1TG0vOVFYRm1MK215TWlzUWxQVzdjSDBYVHdaRXlyYzJKOURXVnBqaUZTdzZ6MDRhZFYxTThCZTJYYmZHUlBBDQpJNnlSdHA4cFAyVGgvdz09DQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tDQo=";

const agent = new https.Agent({
  ca: Buffer.from(caBase64, "base64"),
  rejectUnauthorized: false, // Set to true in production
});


const createAxiosInstance = (contentType: string) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": contentType,
      "Accept-Language": i18n.language,
      lang: i18n.language,
      "ngrok-skip-browser-warning": "69420",
    },
    httpsAgent: agent,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      window.location.href = "authentication/sign-in"
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance("application/x-www-form-urlencoded");
const axiosInstanceSilent = createAxiosInstance("application/json");
const axiosInstancePut = createAxiosInstance("application/x-www-form-urlencoded");

const handleResponse = (response: AxiosResponse) => {
  toast.success("Request Successful!");
  return response;
};

const handleError = (error: any) => {
  const errorMessage =
    error.response?.data?.error_description ||
    error.response?.data?.error?.message ||
    "An error occurred";
  toast.error(`Error: ${errorMessage}`);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(handleResponse, handleError);
axiosInstanceSilent.interceptors.response.use((response) => response, handleError);
axiosInstancePut.interceptors.response.use(handleResponse, handleError);

export const ApiService = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.get<T, AxiosResponse<T>>(url, config);
    return { data: response.data, status: response.status };
  },

  async getSilent<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstanceSilent.get<T, AxiosResponse<T>>(
      url,
      config
    );
    return { data: response.data, status: response.status };
  },

  async post<T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.post<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return { data: response.data, status: response.status };
  },

  async put<T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstancePut.put<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return { data: response.data, status: response.status };
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await axiosInstance.delete<T, AxiosResponse<T>>(url, config);
    return { data: response.data, status: response.status };
  },
};
