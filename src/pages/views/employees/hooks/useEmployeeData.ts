import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataFetch } from "hooks";
import { Employee } from "models/EmployeesTableData";

export const useEmployeeData = (id?: string) => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleNewEmployeeClick = () => navigate("add");

  const { data: employees, isLoading } = useDataFetch<{
    totalCount: string;
    items?: Employee[];
  }>({
    endpoint: "/api/identity/users",
    queryKey: "get-all-employees",
    method: "getSilent",
    enabled: !id,
  });

  const { data: employeeDetail, isLoading: employeeDataLoading } = useDataFetch<{
    message: string;
    data?: { [key: string]: any };
  }>({
    endpoint: `/api/identity/users/${id}`,
    queryKey: "get-one-employee",
    method: "getSilent",
    enabled: !!id,
  });

  return {
    employees,
    isLoading,
    employeeDetail,
    employeeDataLoading,
    menu,
    setMenu,
    handleNewEmployeeClick,
  };
};
