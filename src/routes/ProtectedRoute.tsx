import { CircularProgress } from "@mui/material";
import { useCookieManager } from "hooks";
import React, { useEffect, useState } from "react";
import { Await, Navigate, useAsyncValue } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ApiService } from "services/api";
import { permissionsState, roleState } from "state/atoms";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  /* Put Your Backend Endpoint And Token Here */
  const { getToken } = useCookieManager();
  const checkTokenLink = "hi, I am URL!";
  const token = "hi, I am token!";

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAucthenticated]: [boolean, Function] = useState(false);
  const [abortController, setAbortController] = useState(new AbortController());
  const setPermissions = useSetRecoilState(permissionsState);
  const setRoles = useSetRecoilState(roleState);

  useEffect(() => {
    const token = getToken();
    ApiService.getSilent("/api/abp/application-configuration").then((res: any) => {
      console.log(res.data);
      setPermissions(res.data.auth.grantedPolicies);
      setRoles(res.data.currentUser.roles[0]);
    });
    fetch(checkTokenLink, {
      headers: { authorization: "bearer " + token },
      signal: abortController.signal,
    })
      .then((res) => {
        setLoading(false);
        setIsAucthenticated(true);
      })
      .catch((err) => {
        console.log("Aborted Error", err);
        setLoading(false);
        setIsAucthenticated(false);
      });

    return () => {
      setLoading(false);
      abortController.abort();
      setAbortController(new AbortController());
    };
  }, []);

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: "#88888888",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  if (isAuthenticated) return children;

  return <Navigate to={"/authentication/sign-in"} replace />;
};
export default ProtectedRoute;
